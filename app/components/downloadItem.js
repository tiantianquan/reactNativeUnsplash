'use strict'
import React  from 'react-native'
import DownloadProcessBar from './downloadProcessBar'

const {
  TouchableOpacity,
  View,
  Image
} = React


const DownloadItem  = React.createClass({
  getInitialState() {
    return {
      :
    }
  },

  render () {
    return (
      <TouchableOpacity>
        <Image
          />
        <DownloadProcessBar
          backgroundColor="rgba(216,216,216,0.1)"
          failColor="rgba(216,216,216,0.1)"
          successColor="rgba(88,150,229,0.4)"
          processColor = "rgba(229,88,88,0.4)"
          // processRatio:PropTypes.number,
          // processState:PropTypes.string
          />
      </TouchableOpacity>
    )
  }
})

export default DownloadItem
