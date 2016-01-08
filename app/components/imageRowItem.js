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
  /**
   * 使用内部state可防止url缓存
   */
  componentWillReceiveProps: function(nextProps) {
    this.setState({sourceUrl:nextProps.imageInfo.urls.regular})
  },
  getInitialState: function() {
    return {
      sourceUrl:undefined
    }
  },
  render () {
    const {pressImage,imageInfo,style} = this.props

    return (
      <TouchableHighlight  onPress={()=>pressImage(imageInfo)}>
        <View style={style}>
          <Image
            source={{uri:this.state.sourceUrl}}
            style={{
              resizeMode:'cover',
              height: 375 / imageInfo.width * imageInfo.height,
              maxHeight:500,
              flex:1
            }}/>
          </View>
        </TouchableHighlight>
    )
  }
})

export default ImageRowItem
