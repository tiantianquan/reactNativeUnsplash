'use strict'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'react-native-vector-icons'
//import cssVar from 'cssVar'


import HomeView from '../views/homeView'
import ImageDetailView from '../views/imageDetailView'
import actions from '../actions'

import {
  // NavigatorIOS,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
  View,
  StatusBarIOS
} from 'react-native'

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
          name="ion|ios-arrow-left"
          size={30}
          color="#ccc"
          style={styles.leftIcon} />
      </TouchableOpacity>
    )
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
    )
  },

}


const MainView = React.createClass({
  _pressImage(imageInfo){
    this.props.actions.getPhotoByIdAsync(imageInfo.id)
  },

  _freshHomeList(){
    this.props.actions.freshHomeList()
  },


  _renderScene(route,navigator){
    this.route = route
    this.navigator = navigator

    switch (route.name) {
      case 'unsplash':
        return this._navToDetailView()
      default:
        return this._navToHomeListView()
    }

  },

  _navToDetailView(){
    console.log('renderDetailView')
    const {detailView:{detailImage:{data}},actions} = this.props
    return  (<ImageDetailView actions={actions} focusPhoto={data} />  )
  },

  _navToHomeListView(){
    console.log('renderListView')
    const {homeView:{imageList},actions,downloadList} = this.props
    return (
      <HomeView
          downloadList = { downloadList }
          homePhotoListState={imageList.loadState}
          onScrollBottom={this._onScrollBottom}
          homePhotoList={imageList.data}
          pressImage={this._pressImage}
          freshList={this._freshHomeList}
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

  _renderNavBar(){
    const {otherState:{navBarShow}}=this.props

    if(navBarShow){
      return (
        <Navigator.NavigationBar style={styles.navBar}
          routeMapper={NavigationBarRouteMapper}
          />
      )
    }else{
      return <View></View>
    }
  },

  _setNavigatorRef(navigator){
    if (navigator !== this._navigator) {
      this._navigator = navigator;

      if (navigator) {

        /**
        * 导航转换完成之后执行的事件
        */
        let that = this
        navigator.navigationContext.addListener('willfocus', (event) => {
          if(event.data.route.name == 'unsplash'){
              that.props.actions.showStatusBar()
              that.props.actions.showNavBar()
          }
          else{
              that.props.actions.hideStatusBar()
              that.props.actions.hideNavBar()
          }
        })
      }
    }
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
        ref={this._setNavigatorRef}
        initialRoute={{name: '', index: 0}}
        navigationBar={this._renderNavBar()}
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
