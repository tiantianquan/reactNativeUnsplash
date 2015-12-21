'use strict'
import React from 'react-native'

const {
  View,
  ListView,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
  ScrollView
} = React


const SubjectListView = React.createClass({
  componentWillMount() {
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  },
  handleClick(rowData){
    this.props.onForward(rowData.id)
  },
  render() {
    const {intheaters} = this.props
    return (
      <ScrollView style={styles.scene}>
      <ListView
        dataSource={this.ds.cloneWithRows(intheaters)}
        renderRow={(rowData) =>
          <TouchableHighlight onPress={()=>this.handleClick(rowData)}>
            <View>

              <View style={styles.row}>
                  <Image
                  style={styles.thumb}
                  source={{uri:rowData.images.large}} />
                <Text style={styles.text}>
                  {rowData.title}
                </Text>
              </View>

              <View style={styles.separator} />
            </View>
          </TouchableHighlight>
        }
        />
    </ScrollView>
    )
  }
})

let styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
  scene: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#EAEAEA',
  },
});

export default SubjectListView
