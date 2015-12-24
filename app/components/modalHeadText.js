'use strict'
import React from 'react-native'

const {
  View,
  Text,
  StyleSheet
} = React

const ModalHeadText = React.createClass({
  render () {
    let { contentText } = this.props
    contentText = typeof(contentText) === 'function'? contentText():contentText
    return (
      <Text style={styles.textStyle}>
        {contentText}
      </Text>
    )
  }
})

const styles = StyleSheet.create({
  textStyle:{
    // fontFamily:'Roboto',
    fontSize:24,
    fontWeight:'bold',
    color:'#ccc',
    marginBottom:2,
  }
})

export default ModalHeadText
