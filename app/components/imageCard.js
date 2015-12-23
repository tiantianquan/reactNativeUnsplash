'use strict'
/**
 * 图片列表项组件
 */
import React from 'react-native'

const{
  TouchableHighlight,
  View,
  Image,
  PixelRatio
} = React
const ImageCard = React.createClass({
  render () {
    return (
      <TouchableHighlight onPress={()=>{
         }}>
        <View>
          <Image
            source={{uri:this.props.imageUrl,
            }}
            style={{
              // height:'auto',
              resizeMode:'contain',
              height:200,
              flex:1
            }}/>
          </View>
        </TouchableHighlight>
    )
  }
})

export default ImageCard
