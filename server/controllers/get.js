const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    console.log('exeu sql')
    // var id = 2
    let userId = ctx.request.body.userId
    // search
    var res = await mysql('biz_user').where({ user_id: userId }).first()
    console.log(res)

    ctx.state.data = {
        user: res
    }
}
