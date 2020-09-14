let app = getApp()

Page({
  data: {
    status:false,
    currentTab: 0,
    items: [
      {
        "text": "鉴宝",
        "iconPath": "../../images/tabBar-img/appraisal.png",
        "selectedIconPath": "../../images/tabBar-img/appraisal_.png"
      },
      {
        "text": "围观",
        "iconPath": "../../images/tabBar-img/onlooker.png",
        "selectedIconPath": "../../images/tabBar-img/onlooker_.png"
      },
      {
        "text": "我的",
        "iconPath": "../../images/tabBar-img/mine.png",
        "selectedIconPath": "../../images/tabBar-img/mine_.png"
      }
    ],
    flag_on:false,
    flag_me:false,
  },

  //切换页面
  swichNav: function (e) {
    let that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if(e.target.dataset.current === 1){
        that.setData({
          flag_on:true
        })
      }

      if(e.target.dataset.current === 2 ){
        that.setData({
          flag_me:true
        })
      }

      if (that.data.status){
        that.setData({
          currentTab: 0
        })
      }else{
        that.setData({
          currentTab:e.target.dataset.current
        })
      }
    }
  },
  onLoad: function () {
    let that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
        status: app.globalData.userInfo.status
      })
    })
  }
})