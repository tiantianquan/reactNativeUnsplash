'use strict'
import React from 'react'

import {
  View,
  Text,
  StyleSheet
} from  'react-native'

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
    fontFamily:'Open Sans',
    fontSize:21,
    fontWeight:'100',
    color:'#ccc',
    marginBottom:5,
  }
})

export default ModalSubText
