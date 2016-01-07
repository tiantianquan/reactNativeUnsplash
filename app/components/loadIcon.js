'use strict'
import React from 'react-native'
import {Icon} from 'react-native-icons'

const {View, Animated} = React

const LoadIcon = React.createClass({
  render() {
    return (
      <View style= {styles.container}>
        <Animated.View style={this.props.style}>
          <Icon
            name="ion|load-c"
            size={20}
            color="#000"
            style={styles.icon}/>
          </Animated.View>
        </View>
      )
    }
  })

  const styles = {
    container:{
      position:'absolute',
      bottom:0,
      top:0,
      left:0,
      right:0,
      backgroundColor:'#ccc',
      flex:1,
      flexDirection:'column',
      justifyContent:'flex-end',
      alignItems: 'center',
    },
    icon:{
      opacity:0.5,
      width: 20,
      height: 20,
      marginBottom:5
    }
  }
  export default LoadIcon
