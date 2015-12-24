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


/**
 * 若source={{uri:}} 中uri为空字符串,会引起app闪退
 */
const ImageRowItem = React.createClass({
  render () {
    const {pressImage,imageInfo,style} = this.props
    return (
      <TouchableHighlight  onPress={()=>pressImage(imageInfo)}>
        <View style={style}>
          <Image
            source={{uri:imageInfo.urls.regular?imageInfo.urls.regular:undefined}}
            style={{
              resizeMode:'cover',
              height:214,
              flex:1
            }}/>
          </View>
        </TouchableHighlight>
    )
  }
})

export default ImageRowItem
