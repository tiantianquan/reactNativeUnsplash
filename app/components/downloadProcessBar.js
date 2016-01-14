'use strict'
import React, { PropTypes } from 'react-native'

const {
  Animated,
  View,
  Text,
   StyleSheet,
   Dimensions
} = React

const window = Dimensions.get('window')

let processBarWidth = window.width * 2 / 3-100

const DownloadProcessBar = React.createClass({
_renderInner(){
  this.widthAnim = this.widthAnim || new Animated.Value(0);

  const {failColor,successColor,processColor,processRatio,processState} = this.props
  let backgroundColor,ratio
  switch (processState) {
    case 'success':
      backgroundColor=successColor
      ratio = 1
      break
    case 'fail':
      backgroundColor=failColor
      ratio = 1
      break
    case 'process':
      backgroundColor=processColor
      ratio = processRatio
      break
    default:
      backgroundColor=processColor
      ratio = 0
      break
  }

  Animated.timing(this.widthAnim, {
              toValue: ratio,   // Returns to the start
              duration:1000
              // velocity: 3,  // Velocity makes it move
              // tension: -10, // Slow
              // friction: 1,  // Oscillate a lot
            }).start();


  return (
    <Animated.View
      style={[
        styles.inner,
        {
          // backgroundColor:backgroundColor,
          backgroundColor:this.widthAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [processColor, backgroundColor],
                }),
          // transform:[{
          //   translateX:200
          // }]
          width:this.widthAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, processBarWidth],
                })
        }
      ]} >

    </Animated.View>
  )

},

  propTypes:{
    backgroundColor:PropTypes.string,
    failColor:PropTypes.string,
    // failIcon:PropTypes.string,
    successColor:PropTypes.string,
    processColor:PropTypes.string,
    //进度
    processRatio:PropTypes.number,
    //进度状态 (success,fail,process)
    processState:PropTypes.string
  },
  render () {
    const {backgroundColor} = this.props
    return (
      <View style={[styles.container,{backgroundColor:backgroundColor}]}>
          {this._renderInner()}

      </View>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  inner:{
    // flex:1,
    // left:-200
  }
})

export default DownloadProcessBar
