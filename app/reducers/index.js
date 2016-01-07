'use strict'
import {
  GET_PHOTOS, GET_PHOTO_BY_ID
}
from '../actions'

const initialState = {
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
      small: ''
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
        homePageParams:{
          ...state.homePageParams,
          page:state.homePageParams.page+1
        },
        homePhotoList: state.homePhotoList.concat(action.data)
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
