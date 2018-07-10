function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime,
  deepClone,
  removeEmptyProperty
}
export function deepClone (obj) {
  var o
  if (typeof obj === 'object') {
    if (obj === null) {
      o = null
    } else {
      if (obj instanceof Array) {
        o = []
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(deepClone(obj[i]))
        }
      } else {
        o = {}
        for (var j in obj) {
          o[j] = deepClone(obj[j])
        }
      }
    }
  } else {
    o = obj
  }
  return o
}
export function removeEmptyProperty (obj) {
  if (!obj) return
  for (var property in obj) {
    var value = obj[property]
    if (!value && value !== 0) {
      delete obj[property]
    } else if (value instanceof Array && value.length === 0) {
      delete obj[property]
    }
  }
  return obj
}
