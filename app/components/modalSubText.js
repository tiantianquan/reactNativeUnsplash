'use strict'
import React from 'react-native'

const {
  View,
  Text,
  StyleSheet
} = React

const ModalSubText = React.createClass({
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
    fontSize:21,
    fontWeight:'bold',
    color:'#ccc',
    marginBottom:10
  }
})

export default ModalSubText
