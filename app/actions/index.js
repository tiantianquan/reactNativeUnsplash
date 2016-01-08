'use strict'
import Api from '../api'

export const GET_PHOTOS = 'GET_PHOTOS'
export const GET_PHOTO_BY_ID = 'GET_PHOTO_BY_ID'
export const GET_USER_INFO_BY_USERNAME = 'GET_USERINFO_BY_USERNAME'
export const GET_PHOTOS_LOADING = 'GET_PHOTOS_LOADING'


/**
 * 获取图片
 */
function getPhotosAsync(page, per_page) {
  return async function(dispatch) {
    dispatch(getPhotosLoading())
    let data = await Api.getPhotos(page, per_page)
    dispatch(getPhotos(data))
  }
}
function getPhotosLoading(){
    return {
      type:GET_PHOTOS_LOADING,
    }
}

function getPhotos(data) {
  return {
    type: GET_PHOTOS,
    data
  }
}

/**
 * 获取单张图片
 */
function getPhotoByIdAsync(id) {
  return async function(dispatch) {
    let data = await Api.getPhotoById(id)
    console.log('action:',data)
    dispatch(getPhotoById(data))
  }
}

function getPhotoById(data) {
  return {
    type: GET_PHOTO_BY_ID,
    data
  }
}

/**
 * 获取用户信息
 */
function getUserInfoByUsernameAsync(username) {
  return async function(dispatch) {
    let data = await Api.getUserInfoByUsername(username)
    dispatch(getUserInfoByUsername(data))
  }
}

function getUserInfoByUsername(data) {
  return {
    type: GET_USER_INFO_BY_USERNAME,
    data
  }
}

export default {
  getPhotosAsync,
  getPhotos,
  getPhotoByIdAsync,
  getPhotoById,
  getUserInfoByUsernameAsync,
  getUserInfoByUsername
}
