'use strict'
/**
 * unsplash 前缀URL
 * @type {String}
 */
const END_POINT_URL = 'https://source.unsplash.com'

/**
 * 随机图片URL
 * @type {RegExp}
 */
const RANDOM_URL = `${END_POINT_URL}/random`

//TODO:添加错误处理
/**
 * API 封装
 */
class Api {
  /**
   * 获取随机图片Url
   * @return {[string]} [Url]
   */
  static async getRandomImageUrl() {
    let jsonData = await fetch(RANDOM_URL)
    return jsonData.url
  }

  /**
   * 请求URL返回JSON对象数据
   */
  static async fetchJsonData(url) {
    let resData = await fetch(url)
    return resData.json()
  }

  static async fetchTextData(url) {
    let resData = await fetch(url)
    return resData.text()
  }
}


export default Api

// module.exports = Api
