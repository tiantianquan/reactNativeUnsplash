'use strict'
import React from 'react-native'
import ImageRowItem from './imageRowItem'
import BottomButton from './bottomButton'
import ImageInfoModal from './imageInfoModal'

const {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  StatusBarIOS
} = React

const ImageDetailView = React.createClass({
  componentWillMount() {
    /**
     * 设置状态栏颜色
     */
    StatusBarIOS.setStyle('light-content',true)
  },
  getInitialState() {
    return {
      modalVisible: false
    }
  },
  _handlePressImage(){
    this.setState({
      modalVisible:true
    })
  },
  render() {
    const {focusPhoto} = this.props
    return (
      <View style={styles.container}>
        <ImageInfoModal imageInfo={focusPhoto} modalVisible={this.state.modalVisible}/>
        <View style={styles.imageContainer}>
          <ImageRowItem pressImage={this._handlePressImage} imageInfo={focusPhoto} />
        </View>
        <View style={styles.bottomButtonContainer}>
          <BottomButton iconName="fontawesome|heart-o" color="#FF6868"/>
          <BottomButton iconName="fontawesome|share" color="#ccc"/>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#393939',
  },
  imageContainer:{
    paddingTop:40,
    flex:1,
    justifyContent:'center',
  },
  bottomButtonContainer:{
    flex:0,
    flexDirection:'row'
  }
})

export default ImageDetailView
