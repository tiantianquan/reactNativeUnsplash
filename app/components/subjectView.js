'use strict'
import React from 'react-native'

const {
  ScrollView,
  Text,
  Image,
} = React


const SubjectView = React.createClass({
  render() {
    const {movie} = this.props
    return (
      <ScrollView style={{
          marginTop:60
        }}>
        <Image
          source={{url:movie.image}}
          />
        <Text>{movie.title}</Text>
        <Text>{movie.year}</Text>
        <Text>{movie.summary}</Text>
      </ScrollView>
    )
  }
})

export default SubjectView
