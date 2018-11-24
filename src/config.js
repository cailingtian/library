// 配置项
//本地环境
///const host = 'http://localhost:5757' 
//测试环境
const host = 'https://stmldyio.qcloud.la'

const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}
export default config
