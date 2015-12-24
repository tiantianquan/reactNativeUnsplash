'use strict'
import React from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux/native'
import cssVar from 'cssVar'


import ImageListView from '../components/imageListView'
import ImageDetailView from '../components/imageDetailView'
import actions from '../actions'

const {
  // NavigatorIOS,
  Image,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  Animated
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
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.name}
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={()=>{}}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
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
    var nextIndex = this.route.index + 1;
    this.props.actions.getPhotoByIdAsync(imageInfo.id)
    this.navigator.push({
      name:'focusPhoto',
      index: nextIndex,
    })
  },
  _renderScene(route,navigator){
    const {actions,homePhotoList,focusPhoto} = this.props
    this.route = route
    this.navigator = navigator
    // switch (route.name) {
    //   case 'focusPhoto':
    //   return  <ImageDetailView focusPhoto={focusPhoto} />
    //   default:
    //   return <ImageListView homePhotoList={homePhotoList} pressImage={this._pressImage} />
    // }

    // dev
    return <ImageDetailView focusPhoto={focusPhoto}/>
  },

  componentWillMount(){
    // this.props.actions.getPhotosAsync()
    //dev
    this.props.actions.getPhotoByIdAsync('YD1uvthZwg4')
  },

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={{name: 'unsplash', index: 0}}
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
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
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
  return {
    homePhotoList:state.homePhotoList,
    focusPhoto:state.focusPhoto,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
