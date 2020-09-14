// pages/about/about.js
//关于我们
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    test(){
        var i = ''
        if(i == 1 && i == 2 || i=='')
        {
            console.log('ok')
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    onShareAppMessage: function (res) {
        console.log(res)
        return {
          title: '专家掌眼｜予复免费在线鉴定',
          success(res){
            console.log(res)
          }
        }
        
      },
})