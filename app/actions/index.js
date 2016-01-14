'use strict'
import Api from '../api'

export const GET_PHOTOS = 'GET_PHOTOS'
export const GET_PHOTO_BY_ID = 'GET_PHOTO_BY_ID'
export const GET_USER_INFO_BY_USERNAME = 'GET_USERINFO_BY_USERNAME'
export const GET_PHOTOS_LOADING = 'GET_PHOTOS_LOADING'
export const HIDE_STATUS_BAR = 'HIDE_STATUS_BAR'
export const SHOW_STATUS_BAR = 'SHOW_STATUS_BAR'
export const GET_PHOTO_BY_ID_LOADING = 'GET_PHOTO_BY_ID_LOADING'
export const HIDE_NAV_BAR = 'HIDE_NAV_BAR'
export const SHOW_NAV_BAR = 'SHOW_NAV_BAR'
export const DOWNLOAD_START = 'DOWNLOAD_START'
export const DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS'
export const DOWNLOAD_FAIL = 'DOWNLOAD_FAIL'
export const DOWNLOAD_PROCESS = 'DOWNLOAD_PROCESS'
export const SAVE_START = 'SAVE_START'
export const SAVE_SUCCESS = 'SAVE_SUCCESS'
export const SAVE_FAIL = 'SAVE_FAIL'

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

function getPhotosLoading() {
  return {
    type: GET_PHOTOS_LOADING,
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

function getPhotoByIdLoading() {
  return {
    type: GET_PHOTO_BY_ID_LOADING,
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

/**
 * statusBar 状态
 */
function hideStatusBar() {
  return {
    type: HIDE_STATUS_BAR,
  }
}

function showStatusBar() {
  return {
    type: SHOW_STATUS_BAR,
  }
}

/**
 * navBar 状态
 */
function hideNavBar() {
  return {
    type: HIDE_NAV_BAR,
  }
}

function showNavBar() {
  return {
    type: SHOW_NAV_BAR,
  }
}

/**
 * 下载 状态 size:full,regular,small
 */
function downloadPreStart(downloadItem) {
  return async function(dispatch) {
    try {
      //开始
      dispatch(downloadStart(downloadItem))
      let data = await Api.downloadImage(downloadItem, () => {
        }, (processEvent) => {
          //TODO:进度 可以在此处加入判断,在进入下载界面在触发process事件,其他时间不触发
          dispatch(downloadProcess(downloadItem,processEvent))
        })
        //成功
      dispatch(downloadPreSuccess(downloadItem,data))

    } catch(e) {
      //失败
      dispatch(downloadFail(downloadItem,e))
    }
  }
}

function downloadStart(downloadItem) {
  return {
    type: DOWNLOAD_START,
    downloadItem
  }
}

function downloadSuccess(downloadItem,data) {
  return {
    type: DOWNLOAD_SUCCESS,
    downloadItem,
    data
  }
}

function downloadPreSuccess(downloadItem,resData) {
  return async function(dispatch) {
    dispatch(downloadSuccess(downloadItem,resData))
    try {
      dispatch(saveStart())
      let data = await Api.saveImageToCameraRoll(downloadItem.savePath)
      dispatch(saveSuccess(data))
    } catch(e) {
      dispatch(saveFail(e))
    }
  }
}

function downloadFail(downloadItem,err) {
  return {
    type: DOWNLOAD_FAIL,
    err,
    downloadItem
  }
}

function downloadProcess(downloadItem,processEvent) {
  return {
    type: DOWNLOAD_PROCESS,
    downloadItem,
    processEvent,
  }
}

//保存到相机
function saveStart() {
  return {
    type: SAVE_START,
  }
}

function saveSuccess(data) {
  return {
    type: SAVE_SUCCESS,
    data
  }

}

function saveFail(err) {
  return {
    type: SAVE_FAIL,
    err
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
  showStatusBar,
  hideNavBar,
  showNavBar,
  downloadPreStart,
  downloadStart,
  downloadSuccess,
  downloadFail,
  downloadProcess,
}
