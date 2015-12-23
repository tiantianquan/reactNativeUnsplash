'use strict'
import urls from './urls'

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
      let jsonData = await fetch(urls.RANDOM_URL)
        // jsonData = jsonData.json()
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
