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
    fontFamily:'Open Sans',
    fontSize:24,
    fontWeight:'bold',
    color:'#ccc',
    marginBottom:5,
  }
})

export default ModalHeadText
