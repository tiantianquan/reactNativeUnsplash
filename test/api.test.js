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

  it('get 10 photo', function() {
    this.timeout(100000)
    return Api.getPhotos(1, 10).then(function(res) {
      expect(res).to.be.a('array')
    })
  })

  it('get photo by id', function() {
    this.timeout(100000)
    return Api.getPhotoById('cssvEZacHvQ').then(function(res) {
      expect(res).to.be.a('object')
      expect(res.id).to.eql('cssvEZacHvQ')
    })
  })

  it('get photo by id err', function() {
    this.timeout(100000)
    return Api.getPhotoById('aaaaaa').then(function(res) {
      console.log(res)
    }).then(function(res) {
      console.log('err',res)
      expect(res).to.be.a('object')
      expect(res).to.have.property('errors')
    })
  })

  it('get photo by id+width+height', function() {
    this.timeout(100000)
    return Api.getPhotoById('cssvEZacHvQ', 100, 200).then(function(res) {
      expect(res).to.be.a('object')
      expect(res.id).to.eql('cssvEZacHvQ')
      expect(res.urls).to.have.property('custom')
      expect(res.urls.custom).to.contain('w=100')
      expect(res.urls.custom).to.contain('h=200')
    })
  })

  it('get user by user name', function() {
    this.timeout(100000)
    return Api.getUserInfoByUsername('jonottosson').then(function(res) {
      expect(res).to.be.a('object')
      expect(res.username).to.eql('jonottosson')
    })
  })
})
