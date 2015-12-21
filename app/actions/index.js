'use strict'
import Api from '../api'

export const Get_Intheaters = 'Get_Intheaters'
export const Get_Movie_By_Id = 'Get_Movie_By_Id'

/*
 * action 创建函数
 */
let actions = {
  //异步函数
  getIntheatersSync() {
    return async function(dispatch) {
      let data = await Api.getIntheaters()
      dispatch(actions.getIntheaters(data))
    }
  },

  //无状态action
  getIntheaters(data) {
    return {
      type: Get_Intheaters,
      data
    }
  },

  getMovieByIdSync(movieId) {
    return async function(dispatch){
      let data = await Api.getMovieById(movieId)
      dispatch(actions.getMovieById(data))
    }
  },

  getMovieById(data) {
    return {
      type: Get_Movie_By_Id,
      data
    }
  }
}

export default actions
