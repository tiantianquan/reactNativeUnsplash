'use strict'
import React from 'react-native'
import {Icon} from 'react-native-icons'
import TimerMixin from 'react-timer-mixin'


const { View, Animated, ScrollView } = React

/**
 * props
 * endReachedDis
 * scrollEndDis
 * loadState
 */

const LoadIcon = React.createClass({
  mixins: [TimerMixin],

  /**
   * 载入前执行
   */
  _handleLoadBefore(){
    const dis =  this.props.scrollEndDis
    if ( dis > 0 ){
      const endReachedDis = -this.props.endReachedThreshold
      const ratio = dis / endReachedDis
      for(let i in this.state.anim){
        Animated.timing(this.state.anim[i], {
          toValue: ratio,
          duration:0
        }).start()
      }
    }
  },

  /**
   * 载入中执行
   */
  _handleLoading(){
    this.setInterval(()=>{
      this.setState({
        anim:{
          opacity:new Animated.Value(1),
          scale:new Animated.Value(1),
          rotate:new Animated.Value(1)
        }
      })
      Animated.timing(this.state.anim.rotate, {
        toValue: 0,
        duration:1000,
      }).start()
    },1000)
  },

  getInitialState() {
    return {
      anim:{
        opacity:new Animated.Value(0),
        scale:new Animated.Value(0),
        rotate:new Animated.Value(0)
      }
    }
  },

  componentWillReceiveProps(nextProps) {
    const loadState = nextProps.loadState
      if (loadState === 'loadBefore'){
        this._handleLoadBefore()
      }
      if (this.props.loadState!== nextProps.loadState&& loadState === 'loading'){
        this._handleLoading()
      }
   },

  render() {
    return (

      <View style= {styles.container}>
        <Animated.View style={{
            opacity:this.state.anim.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [ 0, 1],
            }),
            transform: [
              {scale: this.state.anim.scale.interpolate({
                inputRange: [0, 1],
                outputRange: [ 0, 1],
              })},
              {rotate: this.state.anim.rotate.interpolate({
                inputRange: [0, 1],
                outputRange: [ '0deg', '360deg'],
              })},
            ]
          }}>
          <Icon
            name="ion|load-c"
            size={50}
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
      width: 50,
      height: 50,
      marginBottom:0
    }
  }
  export default LoadIcon
