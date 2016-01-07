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

  _handleScroll(e){
    let dis  =e.nativeEvent.contentOffset.y+e.nativeEvent.layoutMeasurement.height-e.nativeEvent.contentSize.height
    if(dis > 0){
      this.setState({
        ...this.state,
        scrollEndDis:dis,
        scrollEventThrottle:0
      })
    }else{
      this.setState({
        ...this.state,
        scrollEndDis:dis,
        scrollEventThrottle:1000
      })
    }
  },

  getInitialState: function() {
    return {
      scrollEndDis: 0,
      endReachedThreshold:-100,
      scrollEventThrottle:1000

    };
  },

  componentWillMount() {
    this._bindDatatSource()
    this._hideStatusBar()
  },
  render() {
    const {homePhotoList,homePhotoListState} = this.props
    return (
      <View style={{flex:1}}>
        <LoadIcon loadState={homePhotoListState}  scrollEndDis={this.state.scrollEndDis} endReachedThreshold={this.state.endReachedThreshold} />
        <ListView
          scrollEventThrottle={this.state.scrollEventThrottle}
          onScroll={this._handleScroll}
          onEndReachedThreshold={this.state.endReachedThreshold}
          onEndReached={this._onScrollBottom}
          dataSource={this.ds.cloneWithRows(homePhotoList)}
          renderRow={this._renderRow}
          style={ [styles.imageListViewStyle,homePhotoListState==='loading'?styles.loading:{}] }
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
  loading:{
    marginBottom:50
  }
})

export default ImageListView
