'use strict'
import {
  GET_PHOTOS, GET_PHOTO_BY_ID, GET_PHOTOS_LOADING, HIDE_STATUS_BAR, SHOW_STATUS_BAR,
  GET_PHOTO_BY_ID_LOADING, HIDE_NAV_BAR, SHOW_NAV_BAR, DOWNLOAD_START, DOWNLOAD_SUCCESS,
  DOWNLOAD_FAIL, DOWNLOAD_PROCESS, SAVE_START, SAVE_SUCCESS, SAVE_FAIL,
}
from '../actions'

import Immutable, {
  Map, fromJS, List
}
from 'immutable'

const initialState = fromJS({
  /*
    首页
   */
  homeView: {
    imageList: {
      /*
        数据
       */
      data: [{
        urls: {
          small: ''
        }
      }],
      /*
        请求参数
       */
      getParams: {
        page: 1,
        perPage: 10
      },
      /*
        载入状态
       */
      loadState: 'loadBefore',
    },
  },

  //------------------------------------------
  /*
    详细页
   */
  detailView: {
    detailImage: {
      /*
        数据
       */
      data: {
        urls: {
          small: undefined,
          regular: undefined
        },
        exif: {},
        user: {
          profile_image: {}
        }
      },
      /*
        载入状态
       */
      loadState: 'loadBefore'
    }
  },

  //-------------------------------------
  /*
    下载
    {
      id:
      imageInfo:{},
      size:'regular',
      url:'',
      downloadState:'' , success fail process start
      downloadProcessRatio:0, 下载比率
    }
   */
  downloadList: [],

  //-------------------------------------
  /*
    其他
   */
  otherState: {
    statusBarShow: false,
    navBarShow: false
  }
})

function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_PHOTOS:
      return state
        .updateIn(['homeView', 'imageList', 'data'], data => data.concat(action.data))
        .updateIn(['homeView', 'imageList', 'getParams', 'page'], page => page + 1)
        .setIn(['homeView', 'imageList', 'loadState'], 'loadBefore')

    case GET_PHOTOS_LOADING:
      return state.setIn(['homeView', 'imageList', 'loadState'], 'loading')
    case GET_PHOTO_BY_ID:
      return state.setIn(['detailView', 'detailImage'], Map({
        data: action.data,
        loadState: 'loadSuccess'
      }))
    case GET_PHOTO_BY_ID_LOADING:
      return state.setIn(['detailView', 'detailImage', 'loadState'], 'loading')
    case HIDE_STATUS_BAR:
      return state.setIn(['otherState', 'statusBarShow'], false)
    case SHOW_STATUS_BAR:
      return state.setIn(['otherState', 'statusBarShow'], true)
    case HIDE_NAV_BAR:
      return state.setIn(['otherState', 'navBarShow'], false)
    case SHOW_NAV_BAR:
      return state.setIn(['otherState', 'navBarShow'], true)
    case DOWNLOAD_START:
      // let downloadObj = new DownloadObj(action.url, action.imageInfo, action.size)
      action.downloadItem.downloadState = 'start'
      action.downloadItem.downloadProcessRatio = 0
      return state.update('downloadList', (list) => list.push(action.downloadItem))
    case DOWNLOAD_PROCESS:
      let timeGap = 1000
      if(Date.now() - action.downloadItem.lastTime > timeGap) {
        // alert(Date.now() - action.downloadItem.lastTime)
        return state.update('downloadList', (list) => {
          let data = list.find((item) => item.id === action.downloadItem.id)
          data.downloadState = 'process'
          data.downloadProcessRatio = parseFloat(
            (action.processEvent.bytesWritten / action.processEvent.contentLength).toFixed(
              2)
          )
          data.lastTime = Date.now()
          return list.map(data => data)
        })
      }
      else{
        return state
      }
    case DOWNLOAD_SUCCESS:
      return state.update('downloadList', (list) => {
        let data = list.find((item) => item.id === action.downloadItem.id)
        data.downloadState = 'success'
        data.downloadProcessRatio = 1
        return list.map(data => data)
      })
    case DOWNLOAD_FAIL:
      return state.update('downloadList', (list) => {
        let data = list.find((item) => item.id === action.downloadItem.id)
        data.downloadState = 'fail'
        data.downloadProcessRatio = 0
        return list.map(data => data)
      })

    default:
      return state
  }
}



const rootReducer = reducer

export default rootReducer
