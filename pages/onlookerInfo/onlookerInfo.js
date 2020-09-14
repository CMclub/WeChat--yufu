// pages/onlookerInfo/onlookerInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.set()
  },

            //预览图片
    showPicture: function(e){
    let _this = this;
    var index = e.currentTarget.dataset.index;
    var urls = []
    console.log(_this.data.item)
    console.log(_this.data.item.url[0])
    for(var i=0; i<_this.data.item.url.length; i++){
        urls[i] = _this.data.item.url[i]
    }
    wx.previewImage({
        urls: urls,
        current: urls[index]
    })
  },

  set(){
    try {
      const value = wx.getStorageSync('item')
      if (value) {
        // Do something with return value
        this.setData({
            item : value
        })
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
    console.log(this.data.item)
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