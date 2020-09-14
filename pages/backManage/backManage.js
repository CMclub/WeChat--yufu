// pages/backup/backup.js
//管理后台  
//
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList:[],      //专家可见页面信息
    itemInfo:[],      //所需鉴定信息
    num:'',
    id:'',            //任务流id
    urls: [],  //图片urls
    status:false,

    root:false,

    kind:'',
    expert:'',
    operate:'1',
    price:'',
    openid:''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let _this = this
    if(app.globalData.root =='1' ){
      _this.expertGet()
    }
    if(app.globalData.root == '2'){
      _this.setData({
        root : true
      })
    }
    
    //测试
    if(app.globalData.root == '3'){
      _this.expertGet()
      _this.setData({
        root : true
      })
    }
    

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
    wx.switchTab({
      url:'../mine/mine'
    })
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


  toInfo(e){
    let _this = this
    console.log('asdf')
    //是否已鉴定
    console.log(_this.data.itemInfo.length)
    console.log(_this.data.num)
    if(_this.data.itemInfo.length < _this.data.num){
      console.log('sadf')
      _this.expertGet()
      if(_this.data.itemInfo.length == _this.data.num){
        var temp = e.currentTarget.dataset.item;
        _this.data.id = temp.id
        console.log(temp)
        _this.detail()
      }
      
    }else{
      var temp = e.currentTarget.dataset.item;
      _this.data.id = temp.id
      console.log(temp)
      _this.detail()
    }
    
},


  detail(){
    let _this = this
    var temp = ''
    app.globalData.itemInfo = temp
    app.globalData.itemInfo = _this.data.itemInfo
    console.log(app.globalData.itemInfo)
    console.log('&&&&&&&')
    console.log(_this.data.itemInfo)
    _this.data.infoList = _this.data.itemInfo
    temp = _this.data.infoList
    var count = 0
    var i=0
    for(i; i<_this.data.infoList.length; i++){
      if(_this.data.infoList[i].id == _this.data.id){
        temp[count] = _this.data.infoList[i]
        console.log( _this.data.infoList[i])
        count++
      }
    }

    console.log(count)
    for(var k =0 ; k<temp.length; k++){

      if(k == count){
        console.log(k)
        temp.splice(k,1)
        k--
      }
    }
    console.log(temp)
    try {
      wx.setStorageSync('item', temp)
    } catch (e) {console.log(e) }
    wx.navigateTo({
      url:'../backEval/backEval'
    })

    // if(app.globalData.itemInfo){
    //   wx.redirectTo({
    //       url:'../backEval/backEval'
    //   })
    // }
  },



  //仅展示第一张图和类别，点击后调用toInfo进行鉴定
  expertGet(){
    let _this = this
    wx.request({
      url: 'https://www.yufuculture.com/api/admin/give_eval/',
      data:{
        open_id:app.globalData.openid
      },
      success(res){
        console.log('*******************************')
        console.log(res)
        _this.data.infoList = res.data.code
        //暂存全部信息
        _this.setData({
          itemInfo : res.data.code,
          num : res.data.code.length
        })
        // app.globalData.itemInfo = res.data.code
        console.log(_this.data.itemInfo)

        _this.data.urls.splice(0, _this.data.urls.length)

        
        var temp = '0'
        var count = 0
         var text = []
        for(var i = 0; i< _this.data.infoList.length; i++){
          _this.data.infoList[i].url = 'https://dlpic.yufuculture.com/api/' + _this.data.infoList[i].url
          if(_this.data.infoList[i].id != temp){
            _this.data.urls[count] = _this.data.infoList[i]
            
            text[count] = _this.data.infoList[i].url
            // text[count] = _this.data.infoList[i].text
            count++
          }
          temp = _this.data.infoList[i].id
        }
        console.log(_this.data.infoList)
        for(var i=0; i<text.length; i++){
          _this.data.urls[i].url = text[i]
        }
        //  _this.data.urls.url = text
        _this.setData({
          urls:_this.data.urls,
          infoList: _this.data.infoList
      })
        console.log(_this.data.urls)
      }
    })
  },


  expertOp(){
    let _this = this
    if(_this.data.kind !='' && _this.data.expert !='' && _this.data.price !='' && _this.data.openid !=''){
      wx.request({
          url: 'https://www.yufuculture.com/api/admin/sort/',
          data:{
              method:_this.data.operate,
              kind:_this.data.kind,
              expert:_this.data.expert,
              open_id:_this.data.openid,
              price:_this.data.price
          },
          success(res){
              console.log('ok')
              console.log(res)
              wx.navigateTo({
                url:'../mineBar/mineBar'
              })

          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请填写所有条目后提交'
      })
      }
  },

  getKind(e) {
    this.data.kind = e.detail.value
    console.log('text:  ' + this.data.kind)
  },

  getExpert(e) {
    this.data.expert = e.detail.value
    console.log('text:  ' + this.data.expert)
  },

  getPrice(e) {
    this.data.price = e.detail.value
    console.log('text:  ' + this.data.price)
  },

  getOpenid(e) {
    let _this = this
    if(e.detail.value != ''){
      _this.setData({
        openid: e.detail.value
      })
    }
    else{
      this.data.openid = app.globalData.openid
    }
    console.log('text:  ' + this.data.openid)
  },

  getOperate(e) {
    this.setData({
      operate:'0'
    })
    this.expertOp()
  },


})