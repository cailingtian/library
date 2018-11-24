const { mysql } = require('../qcloud');


module.exports = async (ctx) => {
    const {bookid, openid, comment, location, phone} = ctx.request.body
    console.log (bookid, openid, comment, location, phone);
    try {
        await mysql('comments').insert({ openid, bookid, comment, phone, location })
        ctx.state.data = {
            msg: 'success'
        }
    } catch(e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论失败' + e.sqlMessage
            }
        }
    }

} 