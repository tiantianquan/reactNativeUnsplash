'use strict'
/**
 * source 前缀URL
 * @type {String}
 */
const SOURCE_PREFIX = 'https://source.unsplash.com'

/**
 * api 前缀URL
 */
const API_PREFIX = 'https://api.unsplash.com'

export default {
  /**
   * 随机图片URL
   */
  RANDOM: `${SOURCE_PREFIX}/random`,

  /**
   * 图片前缀
   */
  PHOTOS_PREFIX: `${API_PREFIX}/photos`,

  /**
   * 用户前缀
   */
  USER_PREFIX:`${API_PREFIX}/users`,

  /**
   * 生成url查询字符串
   * @param  {String} urlPrefix url前缀
   * @param  {object} paramObj  查询字符串对象
   * @return {String}
   */
  buildQueryUrl(urlPrefix, paramObj) {
    let url = `${urlPrefix}?`
    for (var i in paramObj) {
      if (paramObj[i] !== undefined) {
        url += `${i}=${paramObj[i]}&`
      }
    }
    return url
  }
}
