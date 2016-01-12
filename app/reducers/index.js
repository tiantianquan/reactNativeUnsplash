'use strict'
import {
  GET_PHOTOS, GET_PHOTO_BY_ID,GET_PHOTOS_LOADING,HIDE_STATUS_BAR, SHOW_STATUS_BAR,GET_PHOTO_BY_ID_LOADING
}
from '../actions'

const initialState = {
  homePhotoListState:'loadBefore',
  statusBarShow:false,
  homePageParams:{
    page:1,
    perPage:10
  },
  homePhotoList: [{
    urls: {
      small: ''
    }
  }],
  focusPhoto: {
    urls: {
      small: '',
      regular:undefined
    },
    exif: {},
    user:{profile_image: {}}
  }
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        homePhotoListState:'loadBefore',
        homePageParams:{
          ...state.homePageParams,
          page:state.homePageParams.page+1
        },
        homePhotoList: state.homePhotoList.concat(action.data)
      }
    case GET_PHOTOS_LOADING:
      return {
        ...state,
        homePhotoListState:'loading',
      }
    case GET_PHOTO_BY_ID:
      return {
        ...state,
        detailPhotoState:'loadSuccess',
        focusPhoto: action.data
      }
    case GET_PHOTO_BY_ID_LOADING:
      return {
        ...state,
        detailPhotoState:'loading',
      }
    case HIDE_STATUS_BAR:
      return{
        ...state,
        statusBarShow:false,
      }
    case SHOW_STATUS_BAR:
      return {
        ...state,
        statusBarShow:true
      }
    default:
      return state
  }
}
const rootReducer = reducer

export default rootReducer
