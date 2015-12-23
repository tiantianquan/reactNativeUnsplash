'use strict'
require('babel/register')
var expect = require('expect.js')

describe('api', function() {
  var Api = require('../app/api')
  it('get url return string', function() {
    return Api.fetchTextData('http://www.baidu.com').then(function(res) {
      expect(res).to.be.a('string')
    })
  })

  it('get url return json', function() {
    this.timeout(100000)
    return Api.fetchJsonData('http://api.douban.com/v2/movie/in_theaters').then(
      function(res) {
        expect(res).to.be.a('object')
      })
  })

  it('return image url', function() {
    this.timeout(100000)
    return Api.getRandomImageUrl().then(function(res) {
      expect(res).to.be.a('string')
      expect(res).to.contain('images.unsplash.com/')
    })
  })
})
