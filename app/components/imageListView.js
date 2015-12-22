'use strict'
import React from 'react-native'

const {
  View,
  ListView,
  TouchableHighlight,
  Image,
  StyleSheet,
} = React

const ImageListView = React.createClass({
  componentWillMount() {
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  },

  _renderRow(rowData){
    return (<TouchableHighlight onPress={()=>{}}>
      <View>
        <Image source={rowData.url} />
      </View>
    </TouchableHighlight>)
  },

  render() {
    return (
      <ListView
        dataSource={this.ds.cloneWithRows(imageList)}
        renderRow={this._renderRow}
        />
    )
  }
})

let styles = StyleSheet.create({
})

export default ImageListView
