'use strict'
import React from 'react-native'
import SideMenu from '../components/react-native-side-menu'
import ImageLoadList from '../components/imageLoadList'
import DownloadView from './downloadView'

const {
  ListView,
  View,
  StyleSheet,
  StatusBarIOS,
  Text,
  Dimensions,
} = React

const window = Dimensions.get('window')
const sideMenuWidth = 2 / 3 * window.width


const HomeView = React.createClass({
  render() {
    const {homePhotoList,homePhotoListState,downloadList,onScrollBottom,pressImage} = this.props
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
        <ImageLoadList
          photoListLoadState={homePhotoListState}
          onScrollBottom={onScrollBottom}
          photoList={homePhotoList}
          pressImage={pressImage}
          />
    </SideMenu>
    )
  }
})

export default HomeView
