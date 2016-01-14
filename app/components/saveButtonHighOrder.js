'use strict'
import React from 'react-native'
import RNFS from 'react-native-fs'

const {
  StyleSheet,
  ActionSheetIOS,
} = React

class DownloadItem {
  constructor(url, imageInfo, size) {
    this.url = url
    this.imageInfo = imageInfo
    this.size = size
    this.id = Date.now()
    this.savePath = this.getSavePath(this.id)

    this.downloadState = 'start'
    this.downloadProcessRatio = 0
    this.lastTime = Date.now()
  }
  getSavePath(id){
    return `${RNFS.DocumentDirectoryPath}/${id}.jpeg`
  }
}

const SaveButtonHighOrder = (ButtonComponent) => {
return React.createClass({
  _showActionSheet(){
    let buttonNames = this.state.actionButtons.map(button=> `${button.size} Size` )
    buttonNames.push('Cancel')

    ActionSheetIOS.showActionSheetWithOptions({
      options:buttonNames,
      cancelButtonIndex: buttonNames.length - 1,
    }, (buttonIndex) => {
      if(buttonIndex!== this.state.actionButtons.length-1){
        this._saveItem(this.state.actionButtons[buttonIndex])
      }
    })
  },

  _handleImageOnProcess(){
  },

  _saveItem(downloadItem){
    const { onDownloadStart } = this.props
    onDownloadStart(downloadItem)
  },

  _initActionSheetButtons(imageInfo){
    let {urls} = imageInfo
    let buttonList = []
    if (urls.full){
      buttonList.push(new DownloadItem(urls.full,imageInfo,'Full'))
    }
    if (urls.regular){
      buttonList.push(new DownloadItem(urls.regular,imageInfo,'Regular'))
    }
    if (urls.small){
      buttonList.push(new DownloadItem(urls.small,imageInfo,'Small'))
    }
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
      <ButtonComponent {...this.props} onPress={this._handlePress} />
    )
  }
})
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default SaveButtonHighOrder
//
// <BottomButton
//   iconName="ion|ios-cloud-download-outline"
//   color="#ccc"
//   onPress={this._handlePress}/>
