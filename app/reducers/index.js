'use strict'
import { Get_Intheaters, Get_Movie_By_Id } from '../actions'

const initialState = {
  intheaters: [],
  movie:{
    image:''
  }
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case Get_Intheaters:
      return {
        ...state,
        intheaters: action.data
      }
    case Get_Movie_By_Id:
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
