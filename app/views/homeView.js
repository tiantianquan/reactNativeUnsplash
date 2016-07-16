'use strict'
import React from 'react'
// import * as Cache from 'react-native-http-cache'
import SideMenu from '../components/react-native-side-menu'
import ImageLoadList from '../components/imageLoadList'
import DownloadView from './downloadView'

import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  ActionSheetIOS
} from 'react-native'

const window = Dimensions.get('window')
const sideMenuWidth = 2 / 3 * window.width


const HomeView = React.createClass({
  _renderDebugView(){
    return (
        <View style={styles.container}>
            <Text
              onPress={()=>{
                    // Cache.clear()
                }}
               style={styles.text}>Clear Cache</Text>
          </View>
    )
  },

  _longPressImage(){
    let buttonNames = ['Refresh','Cancel']
    ActionSheetIOS.showActionSheetWithOptions({
      options:buttonNames,
      cancelButtonIndex: buttonNames.length - 1,
    }, (buttonIndex) => {
      if(buttonIndex === 0){
        this.props.freshList()
      }
    })
  },

  render() {
    const {homePhotoList,homePhotoListState,downloadList,onScrollBottom,pressImage,longPressImage} = this.props
    return (
      <SideMenu
        menu={
          <DownloadView
            style={{
              width:sideMenuWidth
            }}
            downloadList={downloadList}
            />
        }
        openMenuOffset = {sideMenuWidth}
        bounceBackOnOverdraw = {false}
        >
        <View style={{flex:1}}>
          {/*{this._renderDebugView()}*/}
          <ImageLoadList
            longPressImage={this._longPressImage}
            photoListLoadState={homePhotoListState}
            onScrollBottom={onScrollBottom}
            photoList={homePhotoList}
            pressImage={pressImage}
            />
        </View>
    </SideMenu>
    )
  }
})

const styles = StyleSheet.create({
    container:{
      backgroundColor:'#000'
    },
    text: {
      flex:1,
      color:'#fff',
      fontSize:20
    }
})

export default HomeView
