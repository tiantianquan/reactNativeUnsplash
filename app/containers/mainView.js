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
  View
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
    var nextIndex = this.route.index + 1
    this.navigator.push({
      name:'unsplash',
      index: nextIndex,
    })
    this.props.actions.getPhotoByIdAsync(imageInfo.id)
  },
  _renderScene(route,navigator){
    const {actions,homePhotoList,focusPhoto,homePhotoListState} = this.props
    this.route = route
    this.navigator = navigator
    switch (route.name) {
      case 'unsplash':
      // this.setState({
      //   showNav:true
      // })
      return  <ImageDetailView focusPhoto={focusPhoto} />
      default:
      // this.setState({
      //   showNav:false
      // })
      return <ImageListView homePhotoListState={homePhotoListState} onScrollBottom={this._onScrollBottom} homePhotoList={homePhotoList} pressImage={this._pressImage} />
    }

  },
  _onScrollBottom(){
    this.props.actions.getPhotosAsync(this.props.homePageParams.page,this.props.homePageParams.perPage)
  },

  componentWillMount(){
    this.props.actions.getPhotosAsync(1,10)
  },

  render() {
    return (
      <Navigator
        ref="nav"
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
    homePhotoListState:state.homePhotoListState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
