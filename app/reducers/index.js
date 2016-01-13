'use strict'
import {
  GET_PHOTOS, GET_PHOTO_BY_ID, GET_PHOTOS_LOADING, HIDE_STATUS_BAR, SHOW_STATUS_BAR,
  GET_PHOTO_BY_ID_LOADING
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
    其他
   */
  otherState: {
    statusBarShow: false,
  }
})

function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_PHOTOS:
      // return {
      //   ...state,
      //   homePhotoListState: 'loadBefore',
      //     homePageParams: {
      //       ...state.homePageParams,
      //         page: state.homePageParams.page + 1
      //     },
      //     homePhotoList: state.homePhotoList.concat(action.data)
      // }
      return state
        .updateIn(['homeView', 'imageList', 'data'], data => data.concat(action.data))
        .updateIn(['homeView', 'imageList', 'getParams', 'page'], page => page + 1)
        .setIn(['homeView', 'imageList', 'loadState'], 'loadBefore')

    case GET_PHOTOS_LOADING:
      return state.setIn(['homeView', 'imageList', 'loadState'], 'loading')
    case GET_PHOTO_BY_ID:
      // return {
      //   ...state,
      //   detailPhotoState: 'loadSuccess',
      //     focusPhoto: action.data
      // }
      return state.setIn(['detailView', 'detailImage'], Map({
        data: action.data,
        loadState: 'loadSuccess'
      }))
    case GET_PHOTO_BY_ID_LOADING:
      // return {
      //   ...state,
      //   detailPhotoState: 'loading',
      // }
      return state.setIn(['detailView', 'detailImage','loadState'], 'loading')
    case HIDE_STATUS_BAR:
      // return {
      //   ...state,
      //   statusBarShow: false,
      // }
      return state.setIn(['otherState', 'statusBarShow'], false)
    case SHOW_STATUS_BAR:
      // return {
      //   ...state,
      //   statusBarShow: true
      // }
      return state.setIn(['otherState', 'statusBarShow'], true)
    default:
      return state
  }
}
const rootReducer = reducer

export default rootReducer
