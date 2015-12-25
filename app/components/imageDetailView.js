'use strict'
import React from 'react-native'
import ImageRowItem from './imageRowItem'
import BottomButton from './bottomButton'
import ImageInfoModal from './imageInfoModal'
import UserHead from './userHead'

const {
  View,
  StyleSheet,
  StatusBarIOS
} = React

const ImageDetailView = React.createClass({
  componentWillMount() {
    /**
     * 设置状态栏颜色
     */
    StatusBarIOS.setHidden(false,'fade')
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
    let avatarImageUrl = focusPhoto.user.profile_image.large
    return (
      <View style={styles.container}>
        <ImageInfoModal imageInfo={focusPhoto} modalVisible={this.state.modalVisible}/>
        <View style={styles.userHeadContainer}>
        <UserHead avatarImageUrl={avatarImageUrl} userName={focusPhoto.user.username}/>
        </View>
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
    justifyContent:'space-between',
  },
  userHeadContainer:{
    alignSelf:'center',
    top:105
  },
  imageContainer:{
    // flex:1,
    // justifyContent:'center',
  },
  bottomButtonContainer:{
    flex:0,
    flexDirection:'row'
  }
})

export default ImageDetailView
