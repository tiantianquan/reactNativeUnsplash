'use strict'
import React  from 'react-native'

const {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} = React

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
    alignItems:'center'
  },
  avatar:{
    borderRadius:25,
    height:50,
    width:50,
    marginBottom:7
  },
  userName:{
    fontSize:12,
    color:'#ccc',
    fontWeight:'100'
  }
})

export default UserHead
