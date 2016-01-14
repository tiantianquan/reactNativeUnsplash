import React, { PropTypes } from 'react-native'

const {
  View,
   StyleSheet
} = React

const DownloadProcessBar = React.createClass({
_renderInner(){
  const {failColor,successColor,processColor,processRatio,processState} = this.props
  let backgroundColor,ratio
  switch (processState) {
    case 'success':
      backgroundColor=successColor
      ratio=1
      break
    case 'fail':
      backgroundColor=failColor
      ratio=0
      break
    case 'process':
      backgroundColor=processColor
      ratio =processRatio
      break
    default:
      break
  }

  return (
    <View
      style={[
        styles.inner,
        {
          backgroundColor:backgroundColor,
          transform:[{
            scaleX:ratio
          }]
        }
      ]} />

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
  conatainer:{
    flex:1
  },
  inner:{
    flex:1
  }
})

export default DownloadProcessBar
