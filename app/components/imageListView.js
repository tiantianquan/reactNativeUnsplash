'use strict'
import React from 'react-native'
import ImageRowItem from './imageRowItem'
import LoadIcon from './loadIcon'

const {
  ListView,
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  StatusBarIOS
} = React

const ImageListView = React.createClass({
  /**
  * 绑定列表数据
  */
  _bindDatatSource(){
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  },

  /**
  * TODO:隐藏状态栏与导航栏
  */
  _hideStatusBar(){
    StatusBarIOS.setHidden(true,'fade')
  },


  /**
  * 渲染列表项
  */
  _renderRow(rowData){
    const {pressImage} = this.props
    return (
      <ImageRowItem
        imageInfo={rowData}
        pressImage={pressImage} />
    )
  },

  _onScrollBottom(){
    this.props.onScrollBottom()
  },
  componentWillMount() {
    this._bindDatatSource()
    this._hideStatusBar()
  },
  render() {
    const {homePhotoList} = this.props
    return (
      <View style={{flex:1}}>
        <LoadIcon />
        <ListView
          onEndReachedThreshold={-100}
          onEndReached={this._onScrollBottom}
          dataSource={this.ds.cloneWithRows(homePhotoList)}
          renderRow={this._renderRow}
          style={ styles.imageListViewStyle }
          contentContainerStyle={{ alignItems: 'stretch' }}
          />
      </View>
    )
  }
})

let styles = StyleSheet.create({
  imageListViewStyle:{
    flex:1,
  },

})

export default ImageListView
