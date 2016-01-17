/**
* 载入动画 - 使用 Spinkit 组件
* 嵌入到 ListView 背后, 所以 ListView 背景必须为透明.(需要优化,实现的并不好,最好是和ListView封成一个组件)
*/

'use strict'
import React from 'react-native'
import Spinner from 'react-native-spinkit'

const { View } = React

const LoadIcon = React.createClass({

  /**
  * 载入前执行
  */
  _handleLoadBefore(){
    const dis =  this.props.scrollEndDis
    if ( dis > 0 ){
      const overBottomDis = -this.props.overBottomDis
      const ratio = dis / overBottomDis > 1 ? 1 : dis / overBottomDis
      this.setState({
        ...this.state,
        opacity:ratio,
        scale:ratio,
      })
    }
    else {
      this.setState({
        ...this.state,
        opacity:0,
        scale:0,
      })
    }
  },

  /**
  * 载入中执行
  */
  _handleLoading(){
    this.setState({
      ...this.state,
      opacity:1,
      scale:1,
    })
  },

  /**
   * 载入成功执行
   */
  _handleLoadSuccess(){
    this.setState({
      ...this.state,
      opacity:0,
      scale:0,
    })
  },

  /**
   * 载入失败执行
   */
  _handleLoadFaild(){ },

  propTypes: {
    //载入状态
    loadState:React.PropTypes.string,
    //滚动超过底部数值
    scrollEndDis:React.PropTypes.number,
    //触发loading动画数值
    endReachedThreshold:React.PropTypes.number,
    //图标颜色
    iconColor:React.PropTypes.string,
    //背景色
    backgroundColor:React.PropTypes.string
  },

  getInitialState() {
    return {
      opacity:0,
      scale:0,
    }
  },

  componentWillReceiveProps(nextProps) {
    const loadState = nextProps.loadState
    if (loadState === 'loadBefore'){
      this._handleLoadBefore()
    }else if (this.props.loadState!== nextProps.loadState&& loadState === 'loading'){
      setTimeout(()=>{
        if (this.props.loadState === 'loading'){
          this.props.onLoading()
          this._handleLoading()
        }
      },500)
    }else if (this.props.loadState!== nextProps.loadState && loadState === 'loadSuccess'){
      this.props.onLoadSuccess()
      this._handleLoadSuccess()
    }
  },

  render() {
    return (
      <View style= {[styles.container,{backgroundColor:this.props.backgroundColor}]}>
        <View style={{
            opacity:this.state.opacity,
            transform: [
              {scale: this.state.scale},
            ]
          }}>
          <Spinner type="Wave" size={30} color={this.props.iconColor} />
        </View>
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
}

export default LoadIcon
