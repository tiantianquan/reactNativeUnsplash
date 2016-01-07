'use strict'
import React from 'react-native'
import {Icon} from 'react-native-icons'

const {View, Animated,ScrollView} = React

const LoadIcon = React.createClass({
  getInitialState() {
    return {
       fadeAnim: new Animated.Value(0), // init opacity 0
       scaleAnim:new Animated.Value(0),
       rotateAnim:new Animated.Value(0)
    }
  },

   componentDidMount() {
     Animated.timing(this.state.scaleAnim,
       {
         toValue: 1,
         duration: 2000,
       },
     ).start()
     Animated.timing(this.state.fadeAnim,
       {
         toValue: 1,
         duration: 2000,
       },
     ).start()
     Animated.timing(this.state.rotateAnim,
       {
         toValue: 1,
         duration: 2000,
       },
     ).start()
   },

  render() {
    return (
      <View style= {styles.container}>
        <Animated.View style={{
            opacity:this.state.fadeAnim,
            transform: [   // Array order matters
              {scale:this.state.scaleAnim},
              {rotate: this.state.rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [ '0deg', '360deg'],
                })
              }
            ],
            }}>
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
    animated:{

    },
    icon:{
      opacity:0.5,
      width: 20,
      height: 20,
      marginBottom:5
    }
  }
  export default LoadIcon
