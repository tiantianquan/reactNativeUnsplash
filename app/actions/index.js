'use strict'
import Api from '../api'

export const GET_PHOTOS = 'GET_PHOTOS'
export const GET_PHOTO_BY_ID = 'GET_PHOTO_BY_ID'
export const GET_USER_INFO_BY_USERNAME = 'GET_USERINFO_BY_USERNAME'
export const GET_PHOTOS_LOADING = 'GET_PHOTOS_LOADING'
export const HIDE_STATUS_BAR = 'HIDE_STATUS_BAR'
export const SHOW_STATUS_BAR = 'SHOW_STATUS_BAR'
export const GET_PHOTO_BY_ID_LOADING = 'GET_PHOTO_BY_ID_LOADING'


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
    dispatch(getPhotoByIdLoading())
    let data = await Api.getPhotoById(id)
    dispatch(getPhotoById(data))
  }
}

function getPhotoByIdLoading(){
    return {
      type:GET_PHOTO_BY_ID_LOADING,
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

function hideStatusBar(){
  return {
    type: HIDE_STATUS_BAR,
  }
}

function showStatusBar(){
  return {
    type: SHOW_STATUS_BAR,
  }
}

export default {
  getPhotosAsync,
  getPhotos,
  getPhotoByIdAsync,
  getPhotoById,
  getUserInfoByUsernameAsync,
  getUserInfoByUsername,
  hideStatusBar,
  showStatusBar
}
