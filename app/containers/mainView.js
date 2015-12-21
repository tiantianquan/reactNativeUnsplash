'use strict'
import React from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux/native'
import cssVar from 'cssVar'



import SubjectListView from '../components/subjectListView'
import SubjectView from '../components/subjectView'
import actions from '../actions'

const {
  // NavigatorIOS,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
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
  componentWillMount(){
    this.props.actions.getIntheatersSync()
  },
  renderScene(route, navigator){
    const {actions,intheaters,movie} = this.props
    switch (route.name) {
      case 'subjectList':
      return (<SubjectListView
          name={route.name}
          onForward={(movieId) => {
            var nextIndex = route.index + 1;
            actions.getMovieByIdSync(movieId)
            navigator.push({
              name: 'subject',
              index: nextIndex,
              movieId,
            })
          }}
          onBack={() => {
            if (route.index > 0) {
              navigator.pop();
            }
          }}
          intheaters={intheaters}
          />
      )
      case 'subject':
      return (
        <SubjectView
          name={route.name}
          movie={movie}
          />
      )
    }

  },
  render() {

    return (
      // <NavigatorIOS
      //   ref="nav"
      //   style={styles.container}
      //   initialRoute={{
      //     title: 'douban demo',
      //     component:SubjectListView,
      //     passProps: {
      //       intheaters,
      //     },
      //   }} />
      <Navigator
        initialRoute={{name: 'subjectList', index: 0}}
        styles={styles.appContainer}
        navigationBar={
          <Navigator.NavigationBar
            styles={styles.navBar}
            routeMapper={NavigationBarRouteMapper}
            />

        }
        renderScene={this.renderScene}
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
    intheaters:state.intheaters,
    movie:state.movie
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
