const { mysql } = require('../qcloud');

module.exports = async (ctx) => {
    const { bookid,openid } = ctx.request.query;
    console.log ('commentlist',  { bookid,openid });
    const mysqlSelect =  mysql('comments')
                        .select('comments.*', 'cSessionInfo.user_info' )
                        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_Id')
    let comments;
    if (bookid) {
        //图书详情页评论列表
        comments = await  mysqlSelect.where('bookid', bookid);
    } else if (openid) {
        //底部导航栏个人评论列表
        comments = await  mysqlSelect.where('openid', openid);
    }
    ctx.state.data = {
        list: comments.map(v => {
            const info = JSON.parse(v.user_info);
            return Object.assign({}, v, {
                title: info.nickName,
                image: info.avatarUrl
            })
        })
    }


}