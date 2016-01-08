'use strict'
import React from 'react-native'
import {BlurView,VibrancyView} from 'react-native-blur'
import ImageRowItem from './imageRowItem'
import BottomButton from './bottomButton'
import ImageInfoModal from './imageInfoModal'
import UserHead from './userHead'

const {
  View,
  StyleSheet,
  StatusBarIOS,
  Image,
  ActionSheetIOS,
  CameraRoll
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

  render() {
    const {focusPhoto} = this.props
    let avatarImageUrl = focusPhoto.user.profile_image.large
    return (
      <View style={styles.container}>
        <ImageInfoModal
          imageInfo={focusPhoto}
          modalVisible={this.state.modalVisible}/>
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
                    iconName="fontawesome|heart-o"
                    color="#FF6868"/>
                  <BottomButton
                    iconName="fontawesome|share"
                    color="#ccc"
                    onPress={this._showShareSheet}/>
                  <BottomButton
                    iconName="fontawesome|download"
                    color="#ccc"
                    onPress={()=>{this._saveImage(focusPhoto)}}/>
                </View>
              </View>

            </View>


          </BlurView>
        </Image>
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
  }
})

export default ImageDetailView
