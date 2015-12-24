'use strict'
import React from 'react-native'
import {BlurView,VibrancyView} from 'react-native-blur'

const{
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} = React

const ImageInfoModal = React.createClass({
  getInitialState: function() {
    return {
      modalVisible:this.props.modalVisible
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible:nextProps.modalVisible
    })
  },
  render () {
    const {imageInfo} = this.props
    return (
      <Modal
        animated={true}
        visible={this.state.modalVisible}
        transparent={true} >
        <BlurView
          blurType="dark"
          style={{  flex:1,
            opacity:1}} >
            <TouchableHighlight onPress={()=>{this.setState({ modalVisible:false}) }}>
              <View>
                <Text>DIMENSONS</Text>
                <Text>
                  {imageInfo.width} X {imageInfo.height}
                </Text>
                <Text>
                  CAMERA MAKE
                </Text>
                <Text>
                  {imageInfo.exif.make}
                </Text>
                <Text>
                  CAMERA MODEL
                </Text>
                <Text>
                  {imageInfo.exif.model}
                </Text>
                <Text>APERTURE</Text>
                <Text>
                  {imageInfo.exif.aperture}
                </Text>
                <Text>
                  SHUTTER SPEED
                </Text>
                <Text>
                  {imageInfo.exif.exposure_time}
                </Text>
                <Text>
                  FOCAL LENGTH
                </Text>
                <Text>
                  {imageInfo.exif.focal_length}
                </Text>
                <Text>ISO</Text>
                <Text>
                  {imageInfo.exif.iso}
                </Text>
              </View>
            </TouchableHighlight>
          </BlurView>
        </Modal>
      )
    }
  })

  const styles = StyleSheet.create({
  })

  export default ImageInfoModal
