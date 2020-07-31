// pages/eval/eval.js
const app = getApp()
const accountInfo = wx.getAccountInfoSync()

Page({

  /**
   * 页面的初始数据
   */
  data: {

      appid: accountInfo.miniProgram.appId
    
       },



//&&&&&&&&&&&&&&&&&&&&&&&&&& uploadinfo()
  uploadInfo(){
    // wx.request({
    //   url: 'http://www.shoolos.cn:8000/api/user/', //仅为示例，并非真实的接口地址
    //   data: {
    //     name:'test',
    //     y: 'asdgsdfg'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        const total = res.tempFiles
        wx.uploadFile({
          url: 'http://www.shoolos.cn:8000/api/user/', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test',
            'num': total
          },
          success (res){
            const data = res.data
            //do something
          }
        })
      }
    })
  },

  downLoad(){
    wx.downloadFile({
      url: 'http://www.eric0.com/icon-work-file.ico',
      timeoutL:1000,
      success (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          const downloadTask = wx.downloadFile({
            url: 'http://www.eric0.com/icon-work-file.ico', //仅为示例，并非真实的资源
            success (res) {
            }
          })
          
          downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    var _this = this
//获取用户openid
    wx.login({
      success (res) {
        if (res.code) {
          //console.log(res.code)
          wx.getUserInfo({
            success: function(res) {
              var userInfo = res.userInfo
              //var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender 
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
            }
          })
          wx.request({
            url: 'http://www.shoolos.cn:8000/api/user/', 
            data: {
              code:res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              
              console.log(res.data.openid)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    
  },  


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})