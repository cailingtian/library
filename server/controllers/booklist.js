const { mysql } = require('../qcloud')

module.exports = async (ctx)=>{
  const {page, openid} = ctx.request.query;
  const size = 10;

  const mysqlSelect = mysql('books')
                  .select('books.*','cSessionInfo.user_info')
                  .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                  .limit(size)
  let books;
  if (openid) {
    //个人添加的图书
    books = await mysqlSelect.where('books.openid', openid);
    console.log('BOOK',books);
  } else {
    //获取全部图书 分页
    books = await mysqlSelect.offset(Number(page) * size).orderBy('books.id','desc');
  }
    // .orderBy('id','desc')
  ctx.state.data = {
    list:books.map(v=>{
      const info = JSON.parse(v.user_info)
      return Object.assign({},v,{
        user_info:{
          nickName:info.nickName
        }
      })
    })
  }
}