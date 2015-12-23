'use strict'
import React from 'react-native'
import ImageCard from './imageCard'

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
  * 隐藏状态栏与
  */
  _hideStatusBar(){
    StatusBarIOS.setHidden(true,'fade')
  },

  /**
   * 渲染列表项
   */
  _renderRow(rowData){
    return (
      <ImageCard imageUrl={rowData}/>
      )
    },

    componentWillMount() {
      this._bindDatatSource()
      this._hideStatusBar()
    },

    render() {
      return (
        <ListView
          dataSource={this.ds.cloneWithRows([
            'http://127.0.0.1:8080/1.jpeg',
            'http://127.0.0.1:8080/2.jpeg',
            'http://127.0.0.1:8080/3.jpeg',
            'http://127.0.0.1:8080/1.jpeg'
          ])}
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
