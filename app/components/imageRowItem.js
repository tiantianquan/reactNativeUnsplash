'use strict'
/**
 * 图片列表项组件
 */
import React from 'react-native'

const{
  TouchableHighlight,
  View,
  Image,
} = React
const ImageRowItem = React.createClass({
  render () {
    const {imageInfo} = this.props
    return (
      <TouchableHighlight onPress={()=>{
         }}>
        <View>
          <Image
            source={{uri:imageInfo.urls.small}}
            style={{
              resizeMode:'cover',
              height:300,
              flex:1
            }}/>
          </View>
        </TouchableHighlight>
    )
  }
})

export default ImageRowItem
