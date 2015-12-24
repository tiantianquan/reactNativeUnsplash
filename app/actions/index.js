'use strict'
import Api from '../api'

export const GET_PHOTOS = 'GET_PHOTOS'
export const GET_PHOTO_BY_ID = 'GET_PHOTO_BY_ID'
export const GET_USER_INFO_BY_USERNAME = 'GET_USERINFO_BY_USERNAME'


/**
 * 获取图片
 */
function getPhotosAsync() {
  return async function(dispatch) {
    let data = await Api.getPhotos()
    dispatch(getPhotos(data))
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
