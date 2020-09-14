// pages/personalInfo/personalInfo.js
//个人信息
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickName:'',
        avatarUrl:app.globalData.userInfo.avatarUrl,
        telNum:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this
        _this.setData({
            nickName:app.globalData.userInfo.nickName,
            avatarUrl:app.globalData.userInfo.avatarUrl
        })
        // wx.request({
        //     url: 'https://www.yufuculture.com/api/userInfoGet/',
        //     data: {
        //         open_id:app.globalData.openid,
        //     },
        //     header: {
        //         'content-type': 'application/json',
        //     },
        //     success(res) {
        //         console.log(res.data.code)
        //         _this.setData({
        //             nickName:res.data.code.nickName,
        //             avatarUrl:res.data.code.avatarUrl,
        //         })
        //     }
        // })
        // app.globalData.userInfo.nickName = _this.data.nickName
        // app.globalData.userInfo.avatarUrl = _this.data.avatarUrl
    },

    getNickName(e) {
        let _this = this
        _this.setData({
            nickName : e.detail.value
        })
        app.globalData.userInfo.nickName = _this.data.nickName
        console.log('text:  ' + _this.data.nickName)
      },

      getTelNum(e) {
        let _this = this
        _this.setData({
            telNum : e.detail.value
        })
        
        app.globalData.userInfo.telNum = _this.data.telNum
        console.log('text:  ' + _this.data.telNum)
      },



    sendInfo(){
        let _this = this
        if(_this.data.telNum == ''){
            _this.setData({
                telNum:'0'
            })
        }
        console.log(_this.data.nickName)
        console.log(app.globalData.userInfo.avatarUrl)
        wx.request({
            url: 'https://www.yufuculture.com/api/userInfo/',
            data: {
                nickName:_this.data.nickName,
                avatarUrl:app.globalData.userInfo.avatarUrl,
                open_id:app.globalData.openid,
                telNum:_this.data.telNum
            },
            header: {
                'content-type': 'application/json',
            },
            success(res) {
                console.log(res)
                wx.request({
                    url: 'https://www.yufuculture.com/api/userInfoGet/',
                    timeout:3000,
                    data: {
                        open_id:app.globalData.openid,
                    },
                    header: {
                        'content-type': 'application/json',
                    },
                    success(res) {
                        console.log(res)
                        _this.setData({
                            nickName:res.data.code.nickName,
                            avatarUrl:res.data.code.avatarUrl
                        })
                        app.globalData.userInfo.avatarUrl = res.data.code.avatarUrl
                        app.globalData.userInfo.nickName = res.data.code.nickName
                        app.globalData.userInfo.telNum = res.data.code.telNum
                        console.log(app.globalData.userInfo.avatarUrl)
                        
                        wx.reLaunch({
                            url:'../mine/mine'
                        })
                    },
                    fail(res){
                        console.log(res)
                        wx.showModal({
                            title: '提示',
                            content: '已超时，请刷新重试'
                          })
                    }
                })
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


})