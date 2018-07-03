const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    console.log('exeu sql')
    var id = 2
    //add
    var book = {
        id: id,
        name: "bingyuhuozhige",
        price: 88
    }
    await mysql("biz_book").insert(book)
    //search
    var res = await mysql("biz_book").where({ id }).first()
    console.log(res)
    //update
    await mysql("biz_book").update({ price: 66 }).where({ id })
    //search
    var res = await mysql("biz_book").where({ id }).first()
    console.log(res)
    //delete
    // await mysql("biz_book").del().where({ id })
    //search
    var res = await mysql("biz_book").where({ id }).first()
    console.log(res)

    ctx.state.data = {
        msg: 'zheng junfei hello'
    }
}
