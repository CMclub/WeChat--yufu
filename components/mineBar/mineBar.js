const app = getApp()
Component({

  properties: {

  },

  //data***
  data: {
    root:false,
    rCode:'0',
    nickName:app.globalData.userInfo.nickName,
    avatarUrl:app.globalData.userInfo.avatarUrl,
    status:false,
  },

  //methods***
  methods: {
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
                  avatarUrl: res.userInfo.avatarUrl
                })
                app.globalData.userInfo.userInfo = res.userInfo
                app.globalData.userInfo.nickName = res.userInfo.nickName
                app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                console.log(app.globalData.userInfo.userInfo)
                console.log(_this.data.nickName)
                console.log(_this.data.avatarUrl)
                wx.request({
                  url: 'https://www.shoolos.cn:8000/api/userInfo/',
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
                    wx.navigateTo({
                      url: "../appraisal/appraisal"
                    })
                  }
                })
              },
            })
          }
        },
      })
    }
   
  }
,
  onTabItemTap(item) {
    // 可以在此做自己需求的逻辑操作，如点击出现弹窗等
    if (!app.globalData.userInfo.status) {
      wx.showModal({
        title: '提示',
        content: '未授权获取您的头像、昵称信息',
        confirmText: '授权',
        cancelText: '取消',
        success: res => {
          if (res.confirm) {
            wx.getSetting({
              withSubscriptions: true,
              success(res) {
                console.log(res.authSetting['scope.userInfo'])
                if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    success(res) {
                      _this.setData({
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl,
                        status: true
                      })
                      app.globalData.userInfo.userInfo = res.userInfo
                      app.globalData.userInfo.nickName = res.userInfo.nickName
                      app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                      app.globalData.userInfo.status = true
                      console.log(app.globalData.userInfo.userInfo)
                      console.log(_this.data.nickName)
                      console.log(_this.data.avatarUrl)
                      wx.request({
                        url: 'https://www.shoolos.cn:8000/api/userInfo/',
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

                        }
                      })
                    },
                  })
                }
              },
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }

  },


  //ready***
  ready:function () {
    let _this = this
    _this.setData({
      status:app.globalData.userInfo.status,
      nickName:app.globalData.userInfo.nickName,
      avatarUrl:app.globalData.userInfo.avatarUrl,
    })
    if (_this.data.avatarUrl == '' || _this.data.avatarUrl == 'undifend') {
        _this.setData({
          avatarUrl: "../../images/mine-img/头像.jpg"
        })
      }

    // wx.request({
    //   url: 'https://www.shoolos.cn:8000/api/userInfoGet/',
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

    if (app.globalData.root != '0') {
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
})
