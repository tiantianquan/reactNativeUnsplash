'use strict'
import React,{PropTypes}  from 'react-native'
import DownloadProcessBar from './downloadProcessBar'

const {
  TouchableOpacity,
  View,
  Image,
  StyleSheet
} = React


const DownloadItemComponent  = React.createClass({
  propTypes:{
    downloadItem:PropTypes.object
  },

  getInitialState() {
    return { }
  },

  render () {
    const {downloadItem} = this.props
    return (
      <TouchableOpacity style={styles.container}>
        <Image style={styles.image} source={{uri:downloadItem.imageInfo.urls.regular}}
          />
        <DownloadProcessBar
          backgroundColor="rgba(216,216,216,0.1)"
          failColor="rgba(52, 219, 48,1)"
          successColor="rgba(88,150,229,0.4)"
          processColor = "rgba(229,88,88,0.4)"
          processRatio = {downloadItem.downloadProcessRatio}
          processState = {downloadItem.downloadState}
          />
      </TouchableOpacity>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row'
  },
  image:{
    resizeMode:'cover',
    width:100,
    height:100
  }
})

export default DownloadItemComponent
