'use strict'
import RNFS from 'react-native-fs'
import {
  CameraRoll
}
from 'react-native'
import urls from './urls'
import apiConfig from './config'


//TODO:添加错误处理
/**
 * API 封装
 */
class Api {
  /**
   * 获取用户信息
   * @param  {string} username 用户名
   * @return {object}
   */
  static async getUserInfoByUsername(username) {
    let url = urls.buildQueryUrl(`${urls.USER_PREFIX}/${username}`, {
      client_id: apiConfig.APP_ID
    })
    let res = await this.fetchJsonData(url)
    return res
  }

  /**
   * 获取随机图片Url
   * @return {[string]} [Url]
   */
  static async getRandomImageUrl() {
    let res = await fetch(urls.RANDOM)
    return res.url
  }

  /**
   * 获取图片信息
   * @param  {stirng} id
   * @param  {number} width
   * @param  {number} height
   * @return {object}
   */
  static async getPhotoById(id, width, height) {
    let url = urls.buildQueryUrl(`${urls.PHOTOS_PREFIX}/${id}`, {
      client_id: apiConfig.APP_ID,
      w: width,
      h: height
    })
    let res = await this.fetchJsonData(url)
    return res
  }


  /**
   * 获取首页图片
   * @param  {int} page     页码
   * @param  {int} per_page 每页图片数
   * @return {array}        图片信息
   */
  static async getPhotos(page, per_page) {
    let url = urls.buildQueryUrl(
      urls.PHOTOS_PREFIX, {
        client_id: apiConfig.APP_ID,
        page,
        per_page
      })
    let res = await this.fetchJsonData(url)
    return res
  }

  /**
   * 下载图片
   * @param  {string} url         图片URL
   * @param  {function} beginCb   开始callback
   * @param  {function} processCb 进度callback
   */
  static async downloadImage(downloadItem, beginCb, processCb) {
    // let data = await RNFS.downloadFile(downloadItem.url, downloadItem.savePath, beginCb, processCb)
    let data = await RNFS.downloadFile({
      fromUrl: downloadItem.url, // URL to download file from
      toFile:downloadItem.savePath , // Local filesystem path to save the file to
      // headers ? : Headers; // An object of headers to be passed to the server
      background: true,
      progressDivider:0,
      begin:beginCb,
      progress :processCb
    })
    return data

  }

  /**
   * 保存图片到相机胶卷
   * @param  {string} savePath 保存路径
   */
  static async saveImageToCameraRoll(savePath) {
    // let save = function(tag) {
    //   return new Promise((resolve, reject) => {
    //     CameraRoll.saveToCameraRoll(tag, (data) => {
    //       resolve(data)
    //     }, (err) => {
    //       reject(err)
    //     })
    //   })
    // }

    let data = await CameraRoll.saveToCameraRoll(savePath,'photo')
    return data
  }

  /**
   * 请求URL返回JSON对象数据
   */
  static async fetchJsonData(url) {
    let resData = await fetch(url)
    return resData.json()
  }

  /**
   * 请求URL返回字符串
   */
  static async fetchTextData(url) {
    let resData = await fetch(url)
    return resData.text()
  }
}

export default Api
