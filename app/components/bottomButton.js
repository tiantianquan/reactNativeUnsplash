'use strict'
import React from 'react'
import {Icon} from  'react-native-vector-icons'

import {
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native'

const BottomButton = React.createClass({
  render () {
    const { iconName, color,onPress}=this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
          <Icon
            name={iconName}
            size={25}
            color={color}
            style={styles.icon} />
      </TouchableOpacity>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(85,85,85,0.4)',
  },
  icon:{
    height:25,
    width:25
  }
})

export default BottomButton
