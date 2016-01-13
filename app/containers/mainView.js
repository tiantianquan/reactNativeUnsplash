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
     * 导航转换完成之后执行的事件(TODO:多次触发,进行优化)
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
    const {detailView:{detailImage:{data}}} = this.props
    return  (<ImageDetailView focusPhoto={data} />  )
  },

  _navToHomeListView(){
    const {homeView:{imageList}} = this.props
    return (
      <ImageListView
        homePhotoListState={imageList.loadState}
        onScrollBottom={this._onScrollBottom}
        homePhotoList={imageList.data}
        pressImage={this._pressImage}
        />
    )
  },

  _onScrollBottom(){
    const {homeView:{imageList:{getParams}}}= this.props
    this.props.actions.getPhotosAsync(getParams.page,getParams.perPage)
  },

  _handleStatusBar(){
    StatusBarIOS.setHidden(!this.props.otherState.statusBarShow,'fade')
  },

  componentWillReceiveProps(nextProps) {
    const {detailView:{detailImage:{loadState:detailViewLoadState}}} = this.props
    const {detailView:{detailImage:{loadState:nextDetailViewLoadState}}} = nextProps
    if(detailViewLoadState !== nextDetailViewLoadState
      && nextDetailViewLoadState!='loading'){
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
this._handleStatusBar()
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
  return state.toJS()
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
