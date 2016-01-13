'use strict'
import React, { PropTypes } from 'react-native'
import RNFS from 'react-native-fs'
import BottomButton from './bottomButton'

const {
  View,
  StyleSheet,
  ActionSheetIOS,
  CameraRoll,
  Image
} = React

const SaveButton = React.createClass({
  _showActionSheet(){
    let buttonNames = this.state.actionButtons.map(button=> button.name )

    ActionSheetIOS.showActionSheetWithOptions({
      options:buttonNames,
      cancelButtonIndex: buttonNames.length-1,
    }, (buttonIndex) => {
      if(buttonIndex!== this.state.actionButtons.length-1){
        this._saveItem(this.state.actionButtons[buttonIndex].url)
      }
    })
  },

  _handleImageOnProcess(){
      alert('_handleImageOnProcess')
  },

  _saveItem(url){
    // RNFS.readDir(RNFS.MainBundlePath)
    // .then((result) => {
    //   console.log('GOT RESULT', result);
    //
    //   // stat the first file
    //   return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    // })
    // .then((statResult) => {
    //   if (statResult[0].isFile()) {
    //     // if we have a file, read it
    //     return RNFS.readFile(statResult[1], 'utf8');
    //   }
    //
    //   return 'no file';
    // })
    // .then((contents) => {
    //   // log the file contents
    //   console.log(contents);
    // })
    // .catch((err) => {
    //   console.log(err.message, err.code);
    // });

    let downloadImagePath = RNFS.DocumentDirectoryPath+'/a.jpeg'

    RNFS.downloadFile(url,downloadImagePath,
      ()=>{
        console.log('begin')
      },
      (e)=>{
        console.log('process',downloadImagePath)
        if(e.contentLength ===  e.bytesWritten){
          CameraRoll.saveImageWithTag(downloadImagePath, (data)=>{
            console.log('data:',data)
          }, (err) =>{
              console.log('err',err)
           })
        }
      }
    ).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      //catch timeout err
      console.log(err)
    })
  },

  _initActionSheetButtons(imageInfo){
    let {urls} = imageInfo
    let buttonList = []
    if (urls.full){
        buttonList.push({
          name:'Full Size',
          url :urls.full
        })
    }
    if (urls.regular){
      buttonList.push({
        name:'Regular Size',
        url:urls.regular
      })
    }
    if (urls.small){
      buttonList.push({
        name:'Small Size',
        url:urls.samll
      })
    }
    buttonList.push({
      name:'Cancel'
    })

    return buttonList
  },

  _handlePress(){
    this._showActionSheet()
  },


  getInitialState() {
    let imageInfo = this.props.imageInfo
    let actionButtons = this._initActionSheetButtons(imageInfo)
    return {
      actionButtons,
      imageInfo
    }
  },

  render () {
    return (
        <BottomButton
          iconName="ion|ios-cloud-download-outline"
          color="#ccc"
          onPress={this._handlePress}/>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default SaveButton
