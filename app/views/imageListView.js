'use strict'
import React from 'react-native'
import ImageRowItem from '../components/imageRowItem'
import LoadIcon from '../components/loadIconSpinkit'
import ListViewSearchBar from '../components/listViewSearchBar'
import SearchBar from '../components/searchBar'


const {
  ListView,
  View,
  StyleSheet,
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
  * 渲染列表项
  */
  _renderRow(rowData){
    const {pressImage} = this.props
    return (
      /*
        直接传入URL可以更快的显示图片
       */
      <ImageRowItem
        imageInfo={rowData}
        pressImage={pressImage} sourceUrl={rowData.urls.regular} />
    )
  },

  _onScrollBottom(){
    if(this.props.homePhotoListState !=='loading'){
      this.props.onScrollBottom()
    }
  },

  _handleScroll(e){
    let dis  = e.nativeEvent.contentOffset.y+e.nativeEvent.layoutMeasurement.height-e.nativeEvent.contentSize.height
    if (dis > 0){
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

    // if(e.nativeEvent.contentOffset.y<-10){
    //   this.setState({
    //     ...this.state,
    //     showSearchBar:true
    //   })
    // }
  },

  _renderSearchBar(){
    return (
      <View>
        <SearchBar />
      </View>
    )
  },

  _initScrollPosition(){

  },


  getInitialState: function() {
    return {
      scrollEndDis: 0,
      endReachedThreshold:-30,
      scrollEventThrottle:100,
    }
  },

  componentWillMount() {
    this._initScrollPosition()
    this._bindDatatSource()
  },
  render() {
    const {homePhotoList,homePhotoListState} = this.props
    return (
      <View style={{flex:1}}>
        <LoadIcon
          style={styles.loadIcon}
          loadState={homePhotoListState}
          scrollEndDis={this.state.scrollEndDis}
          endReachedThreshold={this.state.endReachedThreshold}
          backgroundColor="#222222"
          iconColor="#e2e2e2"
          />
        <ListView
          /*
            设置初始y轴偏移,将搜索栏隐藏
           */
          contentOffset={{y:70}}
          showsVerticalScrollIndicator={true}
          renderHeader = {this._renderSearchBar}
          scrollEventThrottle={this.state.scrollEventThrottle}
          onScroll={this._handleScroll}
          onEndReachedThreshold={this.state.endReachedThreshold}
          onEndReached={this._onScrollBottom}
          dataSource={this.ds.cloneWithRows(homePhotoList)}
          renderRow={this._renderRow}
          style={[styles.imageListViewStyle,
            homePhotoListState==='loading'?{marginBottom:-this.state.endReachedThreshold}:{},
          ] }
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
