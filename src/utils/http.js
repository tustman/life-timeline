import config from '@/config'

export function request (url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST'
  var header = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}

  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.baseUrl + url,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

export default {
  request
}
