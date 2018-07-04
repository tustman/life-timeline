const { mysql } = require('../qcloud')
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
    console.log('==============>1', ctx.request.body)
    let user = ctx.request.body
    user.status = 1
    user.created = new Date()
    user.modified = new Date()
    console.log('==============>1', user)
    await mysql('biz_user').insert(user)
    ctx.state.data = {
        message: 'hello world'
    }
}
module.exports = {
    get,
    save
}
