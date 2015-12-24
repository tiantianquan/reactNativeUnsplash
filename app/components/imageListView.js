'use strict'
import React from 'react-native'
import ImageRowItem from './imageRowItem'

const {
  View,
  ListView,
  TouchableHighlight,
  Image,
  StyleSheet,
  Text,
  ScrollView,
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
    return (
      <ImageRowItem imageInfo={rowData}/>
      )
    },

    componentWillMount() {
      this._bindDatatSource()
      this._hideStatusBar()
    },

    render() {
      const {homePhotoList} = this.props
      return (
        <ListView
          dataSource={this.ds.cloneWithRows(homePhotoList)}
          renderRow={this._renderRow}
          style={ styles.imageListViewStyle }
          contentContainerStyle={{ alignItems: 'stretch' }}
          />
      )
    }
  })

  let styles = StyleSheet.create({
    imageListViewStyle:{
      flex:1,
    }
  })

  export default ImageListView
