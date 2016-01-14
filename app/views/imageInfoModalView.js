'use strict'
import React from 'react-native'
import {BlurView,VibrancyView} from 'react-native-blur'
import ModalHeadText from '../components/modalHeadText'
import ModalSubText from '../components/modalSubText'

const{
  Modal,
  View,
  StyleSheet,
  TouchableOpacity
} = React

const ImageInfoModal = React.createClass({
  _handleClose(){
    this.props.onClose()
  },
  render () {
    const {imageInfo ,modalVisible} = this.props
    return (
      <Modal
        animated={true}
        visible={modalVisible}
        transparent={true}>
        <BlurView
          blurType="dark"
          style={{flex:1}} >
          <TouchableOpacity
            style={{flex:1}}
            onPress={this._handleClose}>
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
