const app = getApp()

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  reToken: reToken
}

function reToken(){
  var _this = this
  //获取用户openid和token
  wx.login({
    success(res) {
      if (res.code) {
          //获取用户openid
          wx.request({
              url: 'https://www.shoolos.cn:8000/api/user/',
              data: {
                  code: res.code
              },
              header: {
                  'content-type': 'application/json',
              },
              success(res) {
                  var obj = JSON.parse(res.data.openid)
                  app.globalData.openid = obj.openid  //设置openid , 全局变量
                  app.globalData.token = res.data.token  //设置token , 全局变量
                  app.globalData.root = res.data.root
                  console.log('openid:  '+app.globalData.openid)
                  console.log('token:   '+app.globalData.token)
                  console.log('root:  '+app.globalData.root)
              },
              fail(res){
                console.log(res)
              }
          })
      } else {
          console.log('登录失败！' + res.errMsg)
      }
    }
  })
  return 1;
}