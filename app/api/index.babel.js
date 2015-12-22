'use strict';
/**
 * unsplash 前缀URL
 * @type {String}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var END_POINT_URL = 'https://source.unsplash.com';

/**
 * 随机图片URL
 * @type {RegExp}
 */
var RANDOM_URL = END_POINT_URL + '/random';

//TODO:添加错误处理
/**
 * API 封装
 */

var Api = (function () {
  function Api() {
    _classCallCheck(this, Api);
  }

  _createClass(Api, null, [{
    key: 'getRandomImageUrl',

    /**
     * 获取随机图片Url
     * @return {[string]} [Url]
     */
    value: function getRandomImageUrl() {
      var jsonData;
      return regeneratorRuntime.async(function getRandomImageUrl$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(fetch(RANDOM_URL));

          case 2:
            jsonData = context$2$0.sent;
            return context$2$0.abrupt('return', jsonData.url);

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    /**
     * 请求URL返回JSON对象数据
     */
  }, {
    key: 'fetchJsonData',
    value: function fetchJsonData(url) {
      var resData;
      return regeneratorRuntime.async(function fetchJsonData$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(fetch(url));

          case 2:
            resData = context$2$0.sent;
            return context$2$0.abrupt('return', resData.json());

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'fetchTextData',
    value: function fetchTextData(url) {
      var resData;
      return regeneratorRuntime.async(function fetchTextData$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(fetch(url));

          case 2:
            resData = context$2$0.sent;
            return context$2$0.abrupt('return', resData.text());

          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return Api;
})();

exports['default'] = Api;

// module.exports = Api
module.exports = exports['default'];
