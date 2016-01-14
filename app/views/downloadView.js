'use strict'
import React from 'react-native'

const {
  ScrollView,
  StyleSheet
} = React

const DownloadView = React.createClass({

  render () {
    return (
      <ScrollView style={styles.container}>
        <DownloadItem></DownloadItem>
      </ScrollView>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#222222'
  }
})

export default DownloadView
