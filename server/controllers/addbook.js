const https = require('https');
const {mysql} = require('../qcloud');


//https://api.douban.com/v2/book/isbn/9787115352460

module.exports = async(ctx)=>{
    const {isbn, openid} = ctx.request.body
    //console.log(isbn,openid);
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn);
        //判断数据库中是否已存在这本书
        if (findRes.length) {
          ctx.state = {
            code:-1,
            data: {
              msg: '该图书已存在'
            }
          }
          return;
        }


        let url = "https://api.douban.com/v2/book/isbn/" + isbn;
        const bookinfo = await getJSON(url);
        //console.log(bookinfo);
        const rate = bookinfo.rating.average;
        const { title, image, alt, publisher, summary, price} = bookinfo;   //解构赋值
        const tags = bookinfo.tags.map(v=>{
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')

        try {
          await mysql('books').insert({
            isbn,openid,rate,title, image, alt, publisher, summary, price,tags,author
          });

          ctx.state.data = {
            title,
            msg:'success'
          }
        } catch (e) {
          ctx.state = {
            code:-1,
            data: {
              msg: '新增失败' + e.sqlMessage
            }
          }
        }
       
    }
}

function getJSON(url){
    return new Promise((reslove,reject)=>{
      https.get(url,res=>{
        let urlData = ''
        res.on('data', data=>{
          urlData += data
        })
        res.on('end', data=>{
          const bookinfo = JSON.parse(urlData)
          if(bookinfo.title){
            reslove(bookinfo)
          }
          reject(bookinfo)
        })
      })
    })
  }