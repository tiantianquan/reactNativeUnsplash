'use strict'
import React from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux/native'
import { Icon } from 'react-native-icons'
import cssVar from 'cssVar'


import ImageListView from '../views/imageListView'
import ImageDetailView from '../views/imageDetailView'
import actions from '../actions'

const {
  // NavigatorIOS,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
  View,
  StatusBarIOS
} = React

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Icon
          name="fontawesome|angle-left"
          size={30}
          color="#ccc"
          style={styles.leftIcon} />
      </TouchableOpacity>
    );
  },
  RightButton: function(route, navigator, index, navState) {
    return (
      <View></View>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.name}
      </Text>
    );
  },

}


const MainView = React.createClass({
  _pressImage(imageInfo){
    this.props.actions.getPhotoByIdAsync(imageInfo.id)
  },

  _renderScene(route,navigator){
    this.route = route
    this.navigator = navigator

    /**
     * 导航转换完成之后执行的事件
     */
    navigator.navigationContext.addListener('didfocus', (event) => {
      if(event.data.route.name == 'unsplash'){
        this.props.actions.showStatusBar()
      }
      else{
        this.props.actions.hideStatusBar()
      }
    })


    switch (route.name) {
      case 'unsplash':
        return this._navToDetailView()
      default:
        return this._navToHomeListView()
    }

  },

  _navToDetailView(){
    return  (<ImageDetailView  focusPhoto={this.props.focusPhoto} />  )
  },

  _navToHomeListView(){
    return (
      <ImageListView
        homePhotoListState={this.props.homePhotoListState}
        onScrollBottom={this._onScrollBottom}
        homePhotoList={this.props.homePhotoList}
        pressImage={this._pressImage}
        />
    )
  },

  _onScrollBottom(){
    this.props.actions.getPhotosAsync(this.props.homePageParams.page,this.props.homePageParams.perPage)
  },

  _handleStatusBar(statusBarShow){
    StatusBarIOS.setHidden(!statusBarShow,'fade')
  },

  componentWillReceiveProps(nextProps) {
    if(this.props.detailPhotoState !== nextProps.detailPhotoState
      && nextProps.detailPhotoState!='loading'){
        var nextIndex = this.route.index + 1
        this.navigator.push({
          name:'unsplash',
          index: nextIndex,
        })
      }
  },

  componentWillMount(){
    this.props.actions.getPhotosAsync(1,10)
  },

  render() {
    const {statusBarShow} = this.props
    this._handleStatusBar(statusBarShow)
    return (
      <Navigator
        initialRoute={{name: '', index: 0}}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            />
        }
        renderScene={this._renderScene}
        />
    )
  }
})

var styles = StyleSheet.create({
  leftIcon:{
    flex:1,
    height:44,
    width:30,
  },
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'red',
  },
  navBarText: {
    fontSize: 17,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontFamily:'Open Sans',
    fontWeight:'100',
    color: '#ccc',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
    // jkl:1
  },
});


//redux配置
function mapStateToProps(state) {
  return {
    homePhotoList:state.homePhotoList,
    focusPhoto:state.focusPhoto,
    homePageParams:state.homePageParams,
    homePhotoListState:state.homePhotoListState,
    detailPhotoState:state.detailPhotoState,
    statusBarShow:state.statusBarShow,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
