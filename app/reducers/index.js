'use strict'
import { GET_PHOTOS, GET_PHOTO_BY_ID } from '../actions'

const initialState = {
  homePhotoList: [{
    urls:{samll:''}
  }],
  focusPhoto: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        homePhotoList: action.data
      }
    case GET_PHOTO_BY_ID:
      return {
        ...state,
        focusPhoto: action.data
      }
    default:
      return state
  }
}
const rootReducer = reducer

export default rootReducer
