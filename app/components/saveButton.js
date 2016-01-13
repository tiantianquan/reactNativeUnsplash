'use strict'
import React, { PropTypes } from 'react-native'
import BottomButton from './bottomButton'

const {
  View,
  StyleSheet,
  ActionSheetIOS,
  CameraRoll
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

  _saveItem(url){
    CameraRoll.saveImageWithTag(url, function(data) { }, function(err) { })
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
