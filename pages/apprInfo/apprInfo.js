// pages/apprInfo/apprInfo.js
//鉴定详情
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        item:'',
        is_pass:'',
        status:false,
        urls:[],
        audio:false,
        play:false,
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

    set(){
      let _this = this
        try {
            const value = wx.getStorageSync('item')
            if (value) {
              console.log(value)
              value.eval_audio = 'https://dlpic.yufuculture.com/api/' + value.eval_audio
              _this.setData({
                  item : value,
                  is_pass : value.is_pass
              })
              var count = 0

              // for(var i=0; i<_this.data.item.length; i++){
              //   wx.getImageInfo({
              //     src: _this.data.item.url[count],
              //     success(res){
              //       _this.data.item.url[count] = res.path
              //     }
              //   })
              //   count++
              // }

              console.log(_this.data.item.eval_audio)
              if(value.eval_idea == 'null' || value.eval_idea == '' || value.eval_idea == 'nu' || value.eval_idea == 'NaN'){
                _this.setData({
                  audio:true
                })
                console.log(_this.data.audio)
              }


              if(value.is_pass == '0'){
                console.log(value.eval_name)
                if(value.eval_name == 'null' || value.eval_name == '' || value.eval_name == 'nu' || value.eval_name == 'NaN'){
                  _this.setData({
                    status : false,
                    is_pass : '未鉴定' 
                  })
                }else{
                  _this.setData({
                    status : true,
                    is_pass : '已鉴定' 
                  })
                }
                
              }
              if(value.is_pass == '2'){
                _this.setData({
                  status : true,
                  is_pass : '已鉴定' 
                })
              }
              if(value.is_pass == '1'){
                _this.setData({
                  status : false,
                  is_pass : '未鉴定' 
                })
              }
              if(value.is_pass == '3'){
                _this.setData({
                  status : false,
                  is_pass : '已退回' 
                })
              }
              if(value.is_pass == '4'){
                _this.setData({
                  status : false,
                  is_pass : '已超时' 
                })
              }
              console.log(value)
            }
          } catch (e) {
            // Do something when catch error
            console.log(e)
          }
    },

    getLocal(e){
      console.log('ok')
    },


      //预览图片
  showPicture: function(e){
    let _this = this;
    console.log(_this.data.item)
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: _this.data.item.url[index], // 当前显示图片的http链接
      urls: _this.data.item.url // 需要预览的图片http链接列表
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



    onReady (e) {
      // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = wx.createAudioContext('myAudio')
      // this.audioCtx.setSrc('')
      // this.audioCtx.play()
    },
    audioPlay () {
      console.log("play")
      this.audioCtx.play()
      this.setData({play:true})
    },
    audioPause () {
      this.audioCtx.pause()
      this.setData({play:false})
    },
    end(){
      this.setData({play:false})
    },
    audioStart () {
      this.audioCtx.seek(0)
    }
})