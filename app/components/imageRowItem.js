'use strict'
/**
 * 图片列表项组件
 */
import React from 'react-native'

const{
  Dimensions,
  TouchableHighlight,
  View,
  Image,
  Text
} = React

const window = Dimensions.get('window');


/**
 * 若source={{uri:}} 中uri为空字符串,会引起app闪退
 */
const ImageRowItem = React.createClass({
  _handleImageOnProcess(e){
      /**
      e:
      _dispatchIDs: ".r[1]{TOP_LEVEL}[0].0.0.0.$scene_0.0.1.0.1:$r_s1_21.0.0"
      _dispatchListeners: ()
      bubbles: undefined
      cancelable: undefined
      currentTarget: 168
      defaultPrevented: undefined
      dispatchConfig: Object
      dispatchMarker: ".r[1]{TOP_LEVEL}[0].0.0.0.$scene_0.0.1.0.1:$r_s1_21.0.0"
      eventPhase: undefined
      isDefaultPrevented: ()
      isPropagationStopped: ()
      isTrusted: undefined
      nativeEvent: Object
        loaded: 16384
        target: 168
        total: 477468
      __proto__: Object
      target: undefined
      timeStamp: 1452655526624
      type: undefined
       */

    //    let process = e.nativeEvent.loaded / e.nativeEvent.total *100
    //    this.setState({
    //      ...this.state,
    //      imageProcess:process
    //    }
    //  )
  },

  /**
   * 使用内部state可防止url缓存
   */
  componentWillReceiveProps: function(nextProps) {
    this.setState({sourceUrl:nextProps.imageInfo.urls.regular})
  },
  getInitialState: function() {
    return {
      sourceUrl:undefined,
      imageProcess:undefined
    }
  },
  render () {
    const {pressImage,imageInfo,style,sourceUrl,longPressImage} = this.props

    return (
      <TouchableHighlight onLongPress={()=>longPressImage()}  onPress={()=>pressImage(imageInfo)}>
        <View style={style}>
          <Image
            onProgress = {this._handleImageOnProcess}
            source={{uri:sourceUrl}}
            style={{
              resizeMode:'cover',
              height: window.width / imageInfo.width * imageInfo.height,
              maxHeight:500,
              flex:1
            }}>

          </Image>
          </View>
        </TouchableHighlight>
    )
  }
})

export default ImageRowItem

// <Text>{this.state.imageProcess}</Text>
