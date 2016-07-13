'use strict'
import React from 'react'
import {BlurView} from 'react-native-blur'
import ImageRowItem from '../components/imageRowItem'
import BottomButton from '../components/bottomButton'
import ImageInfoModal from './imageInfoModalView'
import UserHead from '../components/userHead'
import SaveButtonHighOrder from '../components/saveButtonHighOrder'
import BottomSaveButton  from '../components/bottomSaveButton'

import  {
  View,
  StyleSheet,
  StatusBar,
  Image,
  ActionSheetIOS,
  CameraRoll
} from 'react-native'

const ImageDetailView = React.createClass({


  componentWillMount() {
    /**
    * 设置状态栏颜色
    */
    StatusBar.setHidden(false,'fade')
    StatusBar.setBarStyle('light-content',true)
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
  _showShareSheet(){
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'https://code.facebook.com',
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      // excludedActivityTypes: [
      //   'com.apple.UIKit.activity.PostToTwitter'
      // ]
    },
    (error) => {
      console.error(error);
    },
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
    })
  },

  _showSaveSheet(){

  },

  _saveImage(focusPhoto){
    CameraRoll.saveImageWithTag(focusPhoto.urls.regular, function(data) {
    console.log(data);
  }, function(err) {
    console.log(err);
  });

  },

  _handleModalClose(){
    this.setState({
      modalVisible:false
    })
  },

  render() {
    const {focusPhoto} = this.props
    let avatarImageUrl = focusPhoto.user.profile_image.large
    return (
      <View style={styles.container}>
        <ImageInfoModal
          imageInfo={focusPhoto}
          modalVisible={this.state.modalVisible}
          onClose={this._handleModalClose}/>
        <Image
          source={{uri:focusPhoto.urls.regular}}
          style={{flex:1,resizeMode:'cover',}} >
          <BlurView
            blurType="dark"
            style={{flex:1}}>

            <View style={styles.innerContainer}>

              <View style={styles.imageContainer}>
                <ImageRowItem
                  pressImage={this._handlePressImage}
                  imageInfo={focusPhoto}
                  sourceUrl={focusPhoto.urls.regular}
                   />
              </View>

              <View style={styles.bottomContainer}>
                <View style={styles.userHeadContainer}>
                  <UserHead
                    avatarImageUrl={avatarImageUrl}
                    userName={focusPhoto.user.username}/>
                </View>

                <View style={styles.bottomButtonContainer}>
                  <BottomButton
                    iconName="ios-share-outline"
                    color="#ccc"
                    onPress={this._showShareSheet}/>
                  <BottomSaveButton
                      imageInfo={focusPhoto}
                      iconName="ios-cloud-download-outline"
                      color="#ccc"
                      onDownloadStart={this.props.actions.downloadPreStart}
                     />
                </View>
              </View>

            </View>


          </BlurView>
        </Image>
      </View>
    )
  }
})
// <BottomButton
//                       iconName="fontawesome|download"
//                       color="#ccc"
//                       onPress={()=>{this._saveImage(focusPhoto)}}/>

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#393939',
  },
  innerContainer:{
    flex:1,
    flexDirection:'column',
  },
  bottomContainer:{
    position:'absolute',
    bottom:0,
    //无法使用 width:100%, 使用 left right 0 控制 absolute 元素大小
    left:0,
    right:0,
  },
  userHeadContainer:{
    alignSelf:'flex-end',
    marginRight:10,
    marginBottom:10
  },
  imageContainer:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    shadowColor: 'white',
    shadowRadius: 10,
    shadowOpacity: 0.5,
    shadowOffset: {
      h: 0,
      w: 0
    },
  },
  bottomButtonContainer:{
    flexDirection:'row',
    height:44
  }
})

export default ImageDetailView


// <BottomButton
//   iconName="fontawesome|heart-o"
//   color="#FF6868"/>
