'use strict'
import React from 'react-native'
import {Icon} from  'react-native-icons'

const {
  TouchableHighlight,
  StyleSheet,
  View
} = React

const BottomButton = React.createClass({
  render () {
    const { iconName, color }=this.props
    return (
      <TouchableHighlight style={styles.container}>
          <Icon
            name={iconName}
            size={20}
            color={color}
            style={styles.icon} />
      </TouchableHighlight>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:44,
    backgroundColor:'#555',
    opacity:0.8
  },
  icon:{
    height:20,
    width:20
  }
})

export default BottomButton
