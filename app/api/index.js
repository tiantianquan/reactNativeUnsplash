'use strict'
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
