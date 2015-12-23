'use strict'
require('babel/register')
var expect = require('expect.js')

describe('Api', function() {
  var Api = require('../app/api')
  var fetch = require('isomorphic-fetch')
  it('request url return string', function() {
    return Api.fetchTextData('http://www.baidu.com').then(function(res) {
      expect(res).to.be.a('string')
    })
  })

  it('request url return json', function() {
    this.timeout(100000)
    return Api.fetchJsonData('http://api.douban.com/v2/movie/in_theaters').then(
      function(res) {
        expect(res).to.be.a('object')
      })
  })

  it('get reandom image url', function() {
    this.timeout(100000)
    return Api.getRandomImageUrl().then(function(res) {
      expect(res).to.be.a('string')
      expect(res).to.contain('images.unsplash.com')
    })
  })
})
