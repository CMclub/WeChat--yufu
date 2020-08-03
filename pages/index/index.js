//appraisal.js
const app = getApp()

Page({
  data: {
    "switer_icons":[
        {"url":"../../images/switer-img/1.jpeg"},
        { "url": "../../images/switer-img/2.jpeg" },
        { "url": "../../images/switer-img/3.jpeg" },
    ],
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

    toAppraisal:function () {
        wx.navigateTo({
            url: "../appraisal/appraisal"
        })
    }

  

})
