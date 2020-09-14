// pages/mine/appraisal.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        root:false,
        rCode:'0',
        nickName:app.globalData.userInfo.nickName,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        status:false,
        sss:[],
    },

    onShareAppMessage: function (res) {
      console.log(res)
      return {
        title: '专家掌眼｜予复免费在线鉴定',
        success(res){
          console.log(res)
        }
      }
      
    },

    //我的鉴定记录
    toRecord:function(){
        if(this.data.status){
          wx.navigateTo({
            url: "../../pages/record/record"
          })
        }
      },
      //个人信息
      toPersonal:function(){
        if(this.data.status){
          wx.navigateTo({
            url: "../../pages/personalInfo/personalInfo"
          })
        }
      },
      //客服
      toService:function(){
        if(this.data.status){
          wx.navigateTo({
            url: "../../pages/service/service"
          })
        }
      },
      //关于
      toAbout:function(){
        if(this.data.status){
          wx.navigateTo({
            url: "../../pages/about/about"
          })
        }
      },
  
      toBackManage:function(){
        wx.navigateTo({
          url:"../../pages/backManage/backManage"
        })
      },
  
      getUserInfo() {
        let _this = this
        wx.getSetting({
          withSubscriptions: true,
          success(res) {
            console.log(res)
            console.log(res.authSetting['scope.userInfo'])
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success(res) {
                  console.log(res)
                  _this.setData({
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl,
                    status:true
                  })
                  app.globalData.userInfo.userInfo = res.userInfo
                  app.globalData.userInfo.nickName = res.userInfo.nickName
                  app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                  app.globalData.userInfo.status = true
                  console.log(app.globalData.userInfo.userInfo)
                  console.log(_this.data.nickName)
                  console.log(_this.data.avatarUrl)
                  wx.request({
                    url: 'https://www.yufuculture.com/api/userInfo/',
                    data: {
                      nickName: _this.data.nickName,
                      avatarUrl: _this.data.avatarUrl,
                      open_id: app.globalData.openid,
                      telNum: ''
                    },
                    header: {
                      'content-type': 'application/json',
                    },
                    success(res) {
                        wx.navigateBack({
                        url: "../mine/mine"
                      })
                    }
                  })
                },
              })
            }
          },
        })
      },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this
      console.log('sss'+_this.data.sss[0])
      
      

      

        _this.setData({
          status:app.globalData.userInfo.status,
          nickName:app.globalData.userInfo.nickName,
          avatarUrl:app.globalData.userInfo.avatarUrl,
        })
        console.log(app.globalData.userInfo.status)
        console.log(app.globalData.userInfo.nickName)
        console.log(app.globalData.userInfo.avatarUrl)
        if (_this.data.avatarUrl == '' || _this.data.avatarUrl == 'undifend') {
            _this.setData({
              avatarUrl: "../../images/mine-img/头像.jpg"
            })
          }
    
        // wx.request({
        //   url: 'https://www.yufuculture.com/api/userInfoGet/',
        //   data: {
        //     open_id: app.globalData.openid,
        //   },
        //   header: {
        //     'content-type': 'application/json',
        //   },
        //   success(res) {
        //     console.log(res.data.code)
        //     _this.setData({
        //       nickName: res.data.code.nickName,
        //       avatarUrl: res.data.code.avatarUrl,
        //     })
        //   }
        // })
        // app.globalData.userInfo.nickName = _this.data.nickName
        // app.globalData.userInfo.avatarUrl = _this.data.avatarUrl
    
        if (app.globalData.root == '1' || app.globalData.root =='2' || app.globalData.root == '3') {
          _this.setData({
            root: true,
            rCode: app.globalData.root
          })
          console.log(app.globalData.userInfo.nickName)
        }
    
        // if (_this.data.avatarUrl == '') {
        //   _this.setData({
        //     avatarUrl: "../../images/mine-img/头像.jpg"
        //   })
        // }

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
        this.onLoad()
        wx:wx.stopPullDownRefresh({
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },


})