// 工具函数库

import config from './config'

//http get工具函数获取数据
export function get (url, data) {
  return request(url, 'GET', data)
}

//http post工具函数 发送数据
export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data);
        } else {
          showModal('添加失败',res.data.data.msg);
          reject(res.data);
        }
      }
    })
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
