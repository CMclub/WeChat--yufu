// pages/backEval/backEval.js

//录音管理
const recorderManager = wx.getRecorderManager()
//音频组件控制
const innerAudioContext = wx.createInnerAudioContext()
var tempFilePath;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    eval_person:'',
    eval_name:'',
    eval_age:'藏品断代',
    eval_kind:'器型',
    eval_idea:'',
    eval_result:'鉴定结果',
    status:'1',
    limitNum:'',

    time:0,
    stop:'',

    item:'',

    kind:[],
    age:[],
    result:[],
  },


  getKind: function (e) {
    let _this = this
    const index = parseInt(e.detail);
    console.log(index)
    console.log(_this.data.kind[index])
    this.setData({
      eval_kind: _this.data.kind[index]
    })
    
},

getAge: function (e) {
  let _this = this
  const index = parseInt(e.detail);
  console.log(index)
  console.log(_this.data.age[index])
  this.setData({
    eval_age: _this.data.age[index]
  })
  
},

getResult: function (e) {
  let _this = this
  const index = parseInt(e.detail);
  console.log(index)
  console.log(_this.data.result[index])
  this.setData({
    eval_result: _this.data.result[index]
  })
  
},




  getInfo(){
    let _this = this
        wx.request({
            url: 'https://www.yufuculture.com/api/admin/expert',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success(res) {
                console.log(res)
                _this.setData({
                  kind:res.data.code.shape,
                  age:res.data.code.age,
                  result:res.data.code.result
                })
                console.log(_this.data.kind.kind)
            }
        })
  },

  showPicture: function(e){
    let _this = this;
    var index = e.currentTarget.dataset.index;
    var urls = []
    for(var i=0; i<_this.data.item.length; i++){
        urls[i] = _this.data.item[i].url
    }
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  expertEval(){
    let _this = this

    var data = new Date()
        var now = ''+data.getFullYear()
        if(data.getMonth() < 10){
            now = now + '0'+ (data.getMonth()+1)
        }
        if(data.getMonth() >= 10){
            now = now + (data.getMonth()+1)
        }
        if(data.getDate() < 10){
            now = now + '0'+data.getDate()
        }
        if(data.getDate() >= 10){
            now = now + data.getDate()
        }
        if(data.getHours() < 10){
          now = now + '0'+data.getHours()
        }
        if(data.getHours() >= 10){
            now = now + data.getHours()
        }
        if(data.getMinutes() < 10){
          now = now + '0'+data.getMinutes()
        }
        if(data.getMinutes() >= 10){
            now = now + data.getMinutes()
        }
        if(data.getSeconds() < 10){
          now = now + '0'+data.getSeconds()
        }
        if(data.getSeconds() >= 10){
            now = now + data.getSeconds()
        }


        console.log(now)
        var idea
        if( _this.data.eval_idea =='' && _this.tempFilePath == ''){
          idea = 0
        }


    if(_this.data.eval_name != '' && _this.data.eval_age != '藏品断代' && _this.data.eval_kind !='器型' && _this.data.eval_result !='鉴定结果' && idea != 0 || _this.data.status == '0'){
      wx.request({
        url: 'https://www.yufuculture.com/api/admin/eval/',
        data:{
            id: _this.data.id,
            eval_name:_this.data.eval_name,
            eval_age:_this.data.eval_age,
            eval_kind:_this.data.eval_kind,
            eval_result:_this.data.eval_result,
            eval_idea:_this.data.eval_idea,
            time:now,
            status:_this.data.status
        },
        success(res){
            console.log(res)
            wx.redirectTo({
              url: "../backManage/backManage"
          })
        },
        fail(res){
          console.log(res)
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请填写所有条目后提交'
    })
    }
  },

  set(){
    try {
      const value = wx.getStorageSync('item')
      if (value) {
        // Do something with return value
        
        this.setData({
            item : value,
            id:value[0].id
        })
        console.log(this.data.item)
      }
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
  },


  getPerson(e) {
    this.data.eval_person = e.detail.value
    console.log('person:  ' + this.data.eval_person)
  },

  getName(e) {
    this.setData({
      eval_name: e.detail.value
    })
    console.log('text:  ' + this.data.eval_name)
  },

  getIdea(e) {
    this.setData({
      eval_idea: e.detail.value
    })
    console.log('text:  ' + this.data.eval_idea)
  },

  countText(e) {
    this.setData({
        limitNum: e.detail.cursor
    })
},


  getStatus(e) {
    this.setData({
      status:'0'
    })
    this.expertEval()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.set()
    console.log('backEval')
    console.log(this.data.item)
    this.getInfo()
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



  startd(){
    let _this = this
    _this.data.stop = setInterval(function(){
       _this.setData({
         time: _this.data.time+1
       })
    }, 1000);
  },

  stop(){
    clearInterval(this.data.stop);
  },


  //开始录音的时候
  start: function () {
    this.startd()
    const options = {
      duration: 300000,//指定录音的时长，单位 ms  5min
      sampleRate: 16000,//采样率
      numberOfChannels: 1,//录音通道数
      encodeBitRate: 96000,//编码码率
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //暂停录音
  pause: function () {
    let _this = this
    clearInterval(_this.data.stop);
    recorderManager.onPause();
    console.log('暂停录音')
  },
  //停止录音
  stop: function () {
    let _this = this
    clearInterval(_this.data.stop);
    
    recorderManager.stop();
    recorderManager.onStop((res) => {
      _this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const { tempFilePath } = res
    })
  },
  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  //上传录音
  upload:function(){
    let _this = this
    wx.uploadFile({
      url: "https://www.yufuculture.com/api/audio/",
      filePath: this.tempFilePath,
      name: 'file',
      header: {'content-type': 'application/json'},
      formData:
      {
        id:this.data.id
      },
      success: function (res) {
        _this.setData({
          time:0
        })
        console.log(res);
        wx.showToast({
          title: '上传成功',
          icon: 'success',
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {

      }
    })
  },



})