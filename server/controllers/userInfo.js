const { mysql } = require('../qcloud')
const axios = require('axios')
const config = require('../config')
const crypto = require('crypto')
const UUID = require('../utils/UUID')

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
async function getUserInfo (ctx, next) {
    let {skey} = getValue(ctx)
    let sessionInfo = await getSessionInfo(skey)
    if (sessionInfo && sessionInfo.open_id) {
        var userInfo = await mysql('biz_user').where({ open_id: sessionInfo.open_id }).first()
        ctx.state.code = 1
        ctx.state.data = {userInfo}
    } else {
        ctx.state.code = -1
        ctx.state.data = {}
    }
}
async function updateUserInfo (ctx, next) {
    let {skey, userInfo} = getValue(ctx)
    let sessionInfo = await getSessionInfo(skey)
    if (sessionInfo && sessionInfo.open_id && userInfo) {
        await mysql('biz_user').update(JSON.parse(userInfo)).where({ open_id: sessionInfo.open_id })
        ctx.state.code = 1
    } else {
        ctx.state.code = -1
    }
    ctx.state.data = {}
}
async function login (ctx, next) {
    // 1. 调用微信服务器,获取 open_id 和 sessionKey
    let {code, userInfo} = getValue(ctx)
    let loginResult = await getSessionKey(code, config.appId, config.appSecret)
    // 2. 查询用户表中该openId是否存在,如果不存在入库一条用户
    if (!loginResult.openid) {
        ctx.state.code = -1
        ctx.state.data = loginResult
        return
    }
    // let loginResult = getValue(ctx)
    // let userInfo = loginResult.userInfo

    var user = await mysql('biz_user').where({open_id: loginResult.openid}).first()
    let userData = userInfo ? JSON.parse(userInfo) : {}
    if (!user) {
        Object.assign(userData, {
            open_id: loginResult.openid,
            status: 1,
            created: new Date(),
            modified: new Date()
        })
        userData.open_id = loginResult.openid
        await mysql('biz_user').insert(userData)
    } else {
        Object.assign(userData, {
            modified: new Date()
        })
        await mysql('biz_user').update(userData).where({ open_id: loginResult.openid })
    }

    user = await mysql('biz_user').where({open_id: loginResult.openid}).first()

    // 3. 查询会话表改openId是否存在,如果存在覆盖,如果不存在,入库一条记录
    var cSessionInfo = await mysql('cSessionInfo').where({open_id: loginResult.openid}).first()
    let uuid = UUID.generateUuid()
    let skey = encryptSha1(loginResult.session_key)
    if (!cSessionInfo) {
        await mysql('cSessionInfo').insert({
            open_id: loginResult.openid,
            session_key: loginResult.session_key,
            skey: encryptSha1(loginResult.session_key),
            uuid: uuid,
            last_visit_time: new Date(),
            create_time: new Date(),
            user_info: JSON.stringify(user)
        })
    } else {
        await mysql('cSessionInfo').update({
            session_key: loginResult.session_key,
            skey: encryptSha1(loginResult.session_key),
            uuid: uuid,
            last_visit_time: new Date(),
            create_time: new Date(),
            user_info: JSON.stringify(user)
        }).where({ open_id: loginResult.openid })
    }
    ctx.state.code = 1
    ctx.state.data = {uuid, skey, user}
}
function getSessionKey (code, appid, appSecret) {
    var opt = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        params: {
            appid: appid,
            secret: appSecret,
            js_code: code,
            grant_type: 'authorization_code'
        }
    }
    return axios(opt).then(function (response) {
        var data = response.data
        if (!data.openid || !data.session_key || data.errcode) {
            return {
                code: -2,
                error: data.errmsg || '返回数据字段不完整'
            }
        } else {
            return data
        }
    })
}
function encryptSha1 (data) {
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
}

function getSessionInfo (skey) {
    return mysql('cSessionInfo').where({skey}).first()
}
function getValue (ctx) {
    return ctx.request.body
}
module.exports = {
    get,
    save,
    login,
    getUserInfo,
    updateUserInfo
}
