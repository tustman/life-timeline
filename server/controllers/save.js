const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    console.log('exeu sql')
    // var id = 2
    console.log('==============>1', ctx.request.body)
    let user = ctx.request.body
    user.created = new Date()
    user.modified = new Date()
    user.status = 1
    console.log('==============>1', user)
    await mysql('biz_user').insert(user)
    // search
    // var res = await mysql('biz_user').where({ id }).first()
    // console.log(res)

    ctx.state.data = {
        message: 'hello world'
    }
}
