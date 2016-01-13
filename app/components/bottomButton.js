'use strict'
import React from 'react-native'
import {Icon} from  'react-native-icons'

const {
  TouchableOpacity,
  StyleSheet,
  View
} = React

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
    height:44,
    backgroundColor:'rgba(85,85,85,0.4)',
  },
  icon:{
    height:25,
    width:25
  }
})

export default BottomButton
