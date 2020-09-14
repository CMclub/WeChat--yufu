// pages/service/service.js
//联系客服
Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoList:[],
        urls :[],
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

          //预览图片
    showPicture: function(e){
    let _this = this;
    var index = e.currentTarget.dataset.index;
    var urls = []
    for(var i=0; i<_this.data.infoList.length; i++){
        urls[i] = _this.data.infoList[i].url
    }
    wx.previewImage({
        urls: urls,
        current: urls[index]
    })
  },

    service() {
        let _this = this
        wx.request({
            url: 'https://www.yufuculture.com/api/service/',
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res)
                _this.data.infoList = res.data.code
                _this.data.urls.splice(0, _this.data.urls.length)
                for(var i =0 ; i< _this.data.infoList.length; i++){
                    console.log('sadf')
                    _this.data.urls[i] = 'https://dlpic.yufuculture.com/api/' + _this.data.infoList[i].url
                    _this.data.infoList[i].url = _this.data.urls[i]
                }
                _this.setData({
                    urls:_this.data.urls,
                    infoList: _this.data.infoList
                })
                console.log(_this.data.urls)
                console.log(_this.data.infoList)
            }
        })
    },
    
    showImg: function (e) {
        var that = this;
        console.log(e)
        wx.previewImage({
            urls: that.data.infoList,
            current: that.data.infoList[e.currentTarget.dataset.index].url
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.service()
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