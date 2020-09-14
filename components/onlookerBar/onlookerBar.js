const app = getApp()
Component({

  properties: {

  },

  //data***
  data: {
    infoList:[],
    urls :[],
    id:'',
    start:'',
  },

  //methods***
  methods: {

    onLazyLoad(info) {
      console.log(info)
    },

    onPullDownRefresh: function () {
      let _this = this
      console.log(_this.data.start)
      _this.setData({
        start: ''
      })
      console.log(_this.data.start)
      _this.show()
    },

    test(){
      let _this = this
      console.log(_this.data.start)
      _this.setData({
        start: ''
      })
      console.log(_this.data.start)
      _this.show()
    },

    loadMore(){
      let _this = this
      console.log(_this.data.start)
      _this.show()
    },


    imgOnLoad(ev) {
      let src = ev.currentTarget.dataset.src,
       width = ev.detail.width,
       height = ev.detail.height
       console.log(src)
       console.log(width)
     },

    toInfo(e){
      let _this = this
      //是否已鉴定
      var temp = e.currentTarget.dataset.item;
      _this.data.id = temp.id
      _this.show_detail()
      // console.log(_this.data.infoList)
      // try {
      //     wx.setStorageSync('item', _this.data.infoList)
      //   } catch (e) {console.log(e) }
      //   wx.redirectTo({
      //     url:'../onlookerInfo/onlookerInfo'
      // })
    },


    //围观
    show() {
      let _this = this
      wx.request({
        url: 'https://www.shoolos.cn:8000/api/show/',
        data:{
          id:_this.data.start
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res)
          _this.data.infoList = res.data.code
          _this.data.urls.splice(0, _this.data.urls.length)

          console.log(_this.data.start)
          for(var i =0 ; i< _this.data.infoList.length; i++){
            _this.data.urls[i] = 'https://www.shoolos.cn:8000/api/' + _this.data.infoList[i].url
            _this.data.infoList[i].url = _this.data.urls[i]
            if(i ===  _this.data.infoList.length-1){
              _this.setData({
                start: _this.data.infoList[_this.data.infoList.length-1].id
              })
              console.log(_this.data.start)
            }
          }
          _this.setData({
            urls:_this.data.urls,
            infoList: _this.data.infoList
          })
          console.log(_this.data.urls)

        }

      })
    },

    //围观详情
    show_detail() {
      let _this = this
      wx.request({
        url: 'https://www.shoolos.cn:8000/api/show_detail/',
        data: {
          id: _this.data.id,
        },
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log('185')
          console.log(res)
          app.globalData.itemInfo = ''
          var temp = res.data.code
          _this.data.urls.splice(0, _this.data.urls.length)
          for(var i =0; i<temp.length; i++){
            _this.data.urls[i] = 'https://www.shoolos.cn:8000/api/' + temp[i].url
          }
          temp.splice(1,temp.length-1)
          temp = temp[0]
          delete temp.url
          temp.url = _this.data.urls
          console.log(temp)
          try {
            wx.setStorageSync('item', temp)
          } catch (e) {console.log(e) }
          wx.navigateTo({
            url:'../onlookerInfo/onlookerInfo'
          })
          // _this.setData({
          //     infoList:temp
          // })
          // console.log(app.globalData.itemInfo)

        }

      })
    },
  },

  ready:function (){
    let _this = this
      _this.show()
  }
})
