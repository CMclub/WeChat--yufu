// pages/onlooker/appraisal.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoList:[],
        reinfoList:[],
        moreinfoList:[],

        urls :[],
        id:'',
        start:'',

        re:false,
        more:false,
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
        _this.show()
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
        let _this = this
      console.log(_this.data.start)

      wx.setNavigationBarTitle({
        title: '加载中...'
      });

      _this.setData({
        start: '',
        re:true
      })
      console.log(_this.data.start)
      _this.reShow()

      wx.setNavigationBarTitle({
        title: ''
      });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let _this = this
        _this.setData({
          more:true
        })
      console.log(_this.data.start)
      _this.moreShow()
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
      reShow() {
        let _this = this
        wx.request({
          url: 'https://www.yufuculture.com/api/show/',
          data:{
            id:_this.data.start
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res)
            _this.data.reinfoList = res.data.code
            _this.data.urls.splice(0, _this.data.urls.length)
  
            console.log(_this.data.start)
            for(var i =0 ; i< _this.data.reinfoList.length; i++){
              _this.data.urls[i] = 'https://dlpic.yufuculture.com/api/' + _this.data.reinfoList[i].url
              _this.data.reinfoList[i].url = _this.data.urls[i]
              if(i ===  _this.data.reinfoList.length-1){
                _this.setData({
                  start: _this.data.reinfoList[_this.data.reinfoList.length-1].id
                })
                console.log(_this.data.start)
              }
            }
            _this.setData({
              urls:_this.data.urls,
              reinfoList: _this.data.reinfoList,
              infoList: _this.data.reinfoList
            })
            console.log(_this.data.urls)
            wx:wx.stopPullDownRefresh({
              success: (res) => {
                console.log('stop')
              },
              fail: (res) => {},
            })
  
          }
  
        })
      },



      //围观
      moreShow() {
        let _this = this
        wx.request({
          url: 'https://www.yufuculture.com/api/show/',
          data:{
            id:_this.data.start
          },
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res)
            _this.data.moreinfoList = res.data.code
            _this.data.urls.splice(0, _this.data.urls.length)
  
            console.log(_this.data.start)
            for(var i =0 ; i< _this.data.moreinfoList.length; i++){
              _this.data.urls[i] = 'https://dlpic.yufuculture.com/api/' + _this.data.moreinfoList[i].url
              _this.data.moreinfoList[i].url = _this.data.urls[i]
              _this.data.infoList.push(_this.data.moreinfoList[i])

              if(i ===  _this.data.moreinfoList.length-1){
                _this.setData({
                  start: _this.data.moreinfoList[_this.data.moreinfoList.length-1].id
                })
                console.log(_this.data.start)
              }
            }
            
            _this.setData({
              urls:_this.data.urls,
              moreinfoList: _this.data.moreinfoList,
              infoList:_this.data.infoList
            })
            console.log(_this.data.infoList)
  
          }
  
        })
      },
  
  
      //围观
      show() {
        let _this = this
        wx.request({
          url: 'https://www.yufuculture.com/api/show/',
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
              _this.data.urls[i] = 'https://dlpic.yufuculture.com/api/' + _this.data.infoList[i].url
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
          url: 'https://www.yufuculture.com/api/show_detail/',
          // timeout:10000,
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
              _this.data.urls[i] = 'https://dlpic.yufuculture.com/api/' + temp[i].url
            }
            temp.splice(1,temp.length-1)
            temp = temp[0]
            delete temp.url
            temp.url = _this.data.urls
            temp.id = _this.data.id
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
  
          },
          fail(res){
            console.log(res)
            wx.showModal({
              title: '提示',
              content: '已超时，请刷新重试'
            })
          }
  
        })
    },




})