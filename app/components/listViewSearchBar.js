'use strict'
import React, { PropTypes } from 'react-native'
import SearchBar from './searchBar'

const {View}=React
const ListViewSearchBar = React.createClass({
  render () {
    return (
      <View style= {[styles.container,{backgroundColor:this.props.backgroundColor}]}>
        <SearchBar />
      </View>
    )
  }
})
const styles = {
  container:{
    position:'absolute',
    bottom:0,
    top:0,
    left:0,
    right:0,
    backgroundColor:'#ccc',
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
  },
}


export default ListViewSearchBar
