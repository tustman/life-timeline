const { mysql } = require('../qcloud')
const axios = require('axios')
const config = require('../config')

async function get (ctx, next) {
    console.log('exeu sql')
    let userId = ctx.request.body.userId
    var res = await mysql('biz_user').where({ user_id: userId }).first()
    console.log(res)
    ctx.state.data = {
        user: res
    }
}

async function save (ctx, next) {
    console.log('exeu sql')
    let user = ctx.request.body
    user.status = 1
    user.created = new Date()
    user.modified = new Date()
    await mysql('biz_user').insert(user)
    ctx.state.data = {
        message: 'hello world'
    }
}
async function getOpenId (ctx, next) {
    let response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${ctx.request.body.code}&grant_type=authorization_code`)
    ctx.body = response.data
}
module.exports = {
    get,
    save,
    getOpenId
}
