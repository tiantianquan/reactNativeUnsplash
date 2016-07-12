'use strict'
import React  from 'react'

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native'

const UserHead = React.createClass({
  render () {
    const {avatarImageUrl,userName} = this.props
    return (
      <View>
        <TouchableOpacity style={styles.container}>
          <Image style={styles.avatar}
            source={{uri:avatarImageUrl}}
            />
          <Text style={styles.userName}>{userName}</Text>
        </TouchableOpacity>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    flexDirection:'row'
  },
  avatar:{
    borderRadius:15,
    height:30,
    width:30,
    marginRight:5
  },
  userName:{
    fontSize:12,
    color:'#ccc',
    fontWeight:'100'
  }
})

export default UserHead
