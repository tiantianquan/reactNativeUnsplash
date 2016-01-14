'use strict'
import React,{PropTypes} from 'react-native'
import DownloadItemComponent from '../components/downloadItemComponent'

const {
  Dimensions,
  View,
  Text,
  ListView,
  StyleSheet
} = React

const window = Dimensions.get('window');


const DownloadView = React.createClass({
  /**
  * 绑定列表数据
  */
  _bindDatatSource(){
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  },

  /**
  * 渲染列表项
  */
  _renderRow(rowItem){
    return (
      <View style={styles.listItem}>
       <DownloadItemComponent downloadItem={rowItem}  />
       </View>
     )
  },

  propTypes:{
    downloadList:PropTypes.array
  },


  componentWillMount() {
    this._bindDatatSource()
  },

  render () {
    const {downloadList} = this.props
    if(downloadList.length === 0){
      return (
        <View style={[styles.container,styles.noContentContainer,this.props.style]}>
          <Text style={styles.noContentText}>No Content</Text>
        </View>
      )
    }
    else{
      return (
        <ListView style={[styles.container,this.props.style]}
          // renderHeader = {this._renderNoContext}
          dataSource={this.ds.cloneWithRows(downloadList)}
          renderRow={this._renderRow}
          contentContainerStyle={{ alignItems: 'stretch' }}
          />
      )
    }
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: window.width,
    height: window.height,
    backgroundColor:'#222222',
  },
  noContentContainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  noContentText:{
    fontFamily:'Open Sans',
    fontSize:24,
    fontWeight:'bold',
    color:'#ccc',
    marginBottom:5,
  },
  listItem:{
    height:100
  }
})

export default DownloadView
