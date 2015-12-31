'use strict'
import React from 'react-native'
import {BlurView,VibrancyView} from 'react-native-blur'
import ModalHeadText from './modalHeadText'
import ModalSubText from './modalSubText'

const{
  Modal,
  View,
  StyleSheet,
  TouchableOpacity
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
        transparent={true}>
        <BlurView
          blurType="dark"
          style={{flex:1}} >
          <TouchableOpacity
            style={{flex:1}}
            onPress={()=>{this.setState({ modalVisible:false}) }}>
            <View
              style={styles.textContainer}>
              <ModalHeadText contentText="DIMENSONS"/>
              <ModalSubText contentText={()=>`${imageInfo.width} X ${imageInfo.height}` }/>
              <ModalHeadText contentText="CAMERA MAKE" />
              <ModalSubText contentText={imageInfo.exif.make} />
              <ModalHeadText contentText="CAMERA MODEL"/>
              <ModalSubText contentText= {imageInfo.exif.model}/>
              <ModalHeadText contentText="APERTURE"/>
              <ModalSubText contentText= {imageInfo.exif.aperture}/>
              <ModalHeadText  contentText="SHUTTER SPEED"/>
              <ModalSubText  contentText= {()=>`${imageInfo.exif.exposure_time}s`}/>
              <ModalHeadText  contentText="FOCAL LENGTH"/>
              <ModalSubText  contentText= {()=>`${imageInfo.exif.focal_length}mm`}/>
              <ModalHeadText  contentText="ISO"/>
              <ModalSubText  contentText= {imageInfo.exif.iso}/>
            </View>
          </TouchableOpacity>
        </BlurView>
      </Modal>
    )
  }
})

const styles = StyleSheet.create({
  textContainer:{
    flex:1,
    justifyContent:'center',
    left:36,
    top:0
  }
})

export default ImageInfoModal
