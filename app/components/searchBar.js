'use strict'
import React, { PropTypes } from 'react-native'

const {Text,View,TextInput,StyleSheet} = React

const SearchBar  = React.createClass({
  render () {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#666"
          clearButtonMode="always"
          style={styles.searchInput} />
        <Text style = {styles.searchButton}>Search</Text>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    height: 40,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:5,
  },
  searchInput:{
    marginRight:5,
    flex:1,
    height:40,
    borderColor: '#ccc',
    backgroundColor:'#444',
    borderRadius:4,
    borderWidth: 1,
    color:'#fff',
    marginBottom:5
  },
  searchButton:{
      color:'rgb(116, 95, 89)'
  }
})

export default  SearchBar
