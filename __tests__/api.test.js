'use strict'

require('babel-polyfill')
import Api from '../app/api'
  // __tests__/sum-test.js
  var testAsync = require('../testAsync')

jest.dontMock('../app/api/index.js')
jest.dontMock('../testAsync.js')

// describe('api', () => {
//   it('get url', function() {
//     // var Api = require('../app/api').default
//     // var str = await Api.getRandomImageUrl()
//     var testAsync = require('../testAsync')
//     var a
//     testAsync.mockImplementation(function(cb) {
//       cb({
//         aa: 1
//       })
//     })
//
//     testAsync(function(res) {
//       console.log(res)
//       a = res
//     })
//
//     expect(testAsync).toBeCalled()
//     expect(a).toEqual({
//       aa: 2
//     })
//
//
//   })
// })


describe('api', () => {
  it('get url', function() {
    // Api.getRandomImageUrl().then(res => {
    //   console.log(res)
    //   expect(1 + 1).toBe(3)
    // })
    // var res = await Api.getRandomImageUrl()
    // console.log(res)


    console.log(testAsync)
    testAsync().then(text=>{

    console.log(text)
    })

  })

})
