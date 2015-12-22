var testAsync = async function(cb) {
  var data = await fetch('http://www.baidu.com')
  var text= data.text()
  return text
}

module.exports = testAsync
