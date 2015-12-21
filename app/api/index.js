'use strict'
//前缀url
const END_POINT_URL = 'http://api.douban.com/v2/movie/'

//正在上映
const IN_THEATERS_URL = `${END_POINT_URL}in_theaters`

//MOVIE 前缀URL
const MOVIE_END_POINT_URL = `${END_POINT_URL}`

//TODO:添加错误处理
/**
 * douban API 封装
 */
class Api {
  /**
   * 获取正在上映列表
   * @return {array} 上映列表
   */
  static async getIntheaters() {
    let jsonData = await this.fetchJsonData(IN_THEATERS_URL)
    return jsonData.subjects
  }

  /**
   * 获取具体电影信息
   * @param  {int || string} id
   * @return {object} 电影信息
   */
  static async getMovieById(id) {
    let jsonData = await this.fetchJsonData(MOVIE_END_POINT_URL + id)
    return jsonData
  }

  /**
   * 请求URL返回JSON对象数据
   */
  static async fetchJsonData(url) {
    let resData = await fetch(url)
    return resData.json()
  }
}


export default Api
