'use strict'
import React from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux/native'
import cssVar from 'cssVar'



import ImageListView from '../components/imageListView'
import SubjectView from '../components/subjectView'
import actions from '../actions'

const {
  // NavigatorIOS,
  Navigator,
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  Animated
} = React

const MainView = React.createClass({
  render () {
    return (
      <ScrollView>
        <Image></Image>
      </ScrollView>

    )
  }
})


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
