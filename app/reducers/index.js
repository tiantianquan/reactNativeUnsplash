'use strict'
import {
  GET_PHOTOS, GET_PHOTO_BY_ID, GET_USER_INFO_BY_USERNAME
}
from '../actions'

const initialState = {
  homePhotoList: [],
  focusPhoto: {
    photoInfo:{},
    userInfo:{}
  },
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        intheaters: action.data
      }
    case GET_PHOTO_BY_ID:
      return {
        ...state,
        movie: action.data
      }
    default:
      return state
  }
}
const rootReducer = reducer

export default rootReducer
