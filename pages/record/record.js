// pages/record/record.js
var util = require('../../utils/util.js');
const app = getApp()
//鉴定记录
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_pass:'0',
        // infoList :app.globalData.infoList,
        // urls :app.globalData.urls,
        infoList :'',
        urls :[],

        id:'',

        tabs:[
            {
                id:0,
                name:"全部",
                isActive:true
            },
            {
                id:1,
                name:"待鉴定",
                isActive:false
            },
            {
                id:2,
                name:"已鉴定",
                isActive:false
            },
            {
                id:3,
                name:"已退回",
                isActive:false
            },
            {
                id:4,
                name:"已超时",
                isActive:false
            }
        ],

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

    handleItemChange(e) {
        console.log(e)
        const {index} = e.detail;
        this.data.is_pass = ''+e.detail.index
        let {tabs} = this.data;
        console.log(this.data)
        tabs.forEach((v,i)=>index === i?v.isActive=true:v.isActive=false);
        this.setData({
           tabs,
           infoList : ''
        });
        this.queryAll()

    },

    toInfo(e){
        let _this = this
        //是否已鉴定
        var temp = e.currentTarget.dataset.item;
        _this.data.id = temp.id
        _this.detail()

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this
        _this.queryAll()
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
        wx.setNavigationBarTitle({
            title: '刷新中...'
          });
        _this.setData({
            infoList:''
        })
        _this.queryAll()
        wx.setNavigationBarTitle({
            title: ''
          });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },



        //获取全部鉴定信息 - done
        queryAll() {
            let _this = this
            console.log(_this.data.is_pass)
            if(_this.data.is_pass == 1)
            {console.log('int')}
            wx.request({
                url: 'https://www.yufuculture.com/api/eval/',
                timeout:5000,
                method:'Get',
                data: {
                    open_id: app.globalData.openid,
                    is_pass: _this.data.is_pass,
                    token:app.globalData.token
                },
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    console.log(res)
                    if(res.data.code === 0){
                        wx.login({
                            success(res) {
                              if (res.code) {
                                  //获取用户openid
                                  wx.request({
                                      url: 'https://www.yufuculture.com/api/user/',
                                      data: {
                                          code: res.code
                                      },
                                      header: {
                                          'content-type': 'application/json',
                                      },
                                      success(res) {
                                          var obj = JSON.parse(res.data.openid)
                                          app.globalData.openid = obj.openid  //设置openid , 全局变量
                                          app.globalData.token = res.data.token  //设置token , 全局变量
                                          app.globalData.root = res.data.root
                                          console.log('openid:  '+app.globalData.openid)
                                          console.log('token:   '+app.globalData.token)
                                          console.log('root:  '+app.globalData.root)
                                          _this.queryAll()
                                      },
                                      fail(res){
                                        console.log(res)
                                      }
                                  })
                              } else {
                                  console.log('登录失败！' + res.errMsg)
                              }
                            }
                          })
                    }
                    app.globalData.token = res.data.token
                    _this.data.infoList = res.data.code
                    _this.data.urls.splice(0, _this.data.urls.length)
                    for(var i =0 ; i< _this.data.infoList.length; i++){
                        _this.data.urls[i] = 'https://dlpic.yufuculture.com/api/' + _this.data.infoList[i].url
                        _this.data.infoList[i].url = _this.data.urls[i]
                        _this.data.infoList[i].status = _this.data.tabs[_this.data.infoList[i].is_pass].name
                    }
                    _this.setData({
                        urls:_this.data.urls,
                        infoList: _this.data.infoList
                    })
                    console.log(_this.data.urls)

                    //下拉刷新结束
                    wx:wx.stopPullDownRefresh({
                        success: (res) => {
                          console.log('stop')
                        },
                        fail: (res) => {},
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
        },

        //鉴定详情
        detail() {
            let _this = this
            wx.request({
                url: 'https://www.yufuculture.com/api/detail/',
                data: {
                    open_id: app.globalData.openid,
                    id: _this.data.id,
                    token:app.globalData.token,
                },
                header: {
                    'content-type': 'application/json'
                },
                success(res) {
                    if(res.data.code == 0){
                        wx.login({
                            success(res) {
                              if (res.code) {
                                  //获取用户openid
                                  wx.request({
                                      url: 'https://www.yufuculture.com/api/user/',
                                      data: {
                                          code: res.code
                                      },
                                      header: {
                                          'content-type': 'application/json',
                                      },
                                      success(res) {
                                          var obj = JSON.parse(res.data.openid)
                                          app.globalData.openid = obj.openid  //设置openid , 全局变量
                                          app.globalData.token = res.data.token  //设置token , 全局变量
                                          app.globalData.root = res.data.root
                                          console.log('openid:  '+app.globalData.openid)
                                          console.log('token:   '+app.globalData.token)
                                          console.log('root:  '+app.globalData.root)
                                          _this.detail()
                                      },
                                      fail(res){
                                        console.log(res)
                                      }
                                  })
                              } else {
                                  console.log('登录失败！' + res.errMsg)
                              }
                            }
                          })
                    }
                    console.log('185')
                    console.log(res)
                    app.globalData.token = res.data.token
                    var temp = res.data.code
                    _this.data.urls.splice(0, _this.data.urls.length)
                    for(var i =0; i<temp.length; i++){
                        _this.data.urls[i] = 'https://dlpic.yufuculture.com/api/' + temp[i].url
                    }
                    temp.splice(1,temp.length-1)
                    temp = temp[0]
                    delete temp.url
                    temp.url = _this.data.urls
                    console.log(temp)
                    temp.is_pass =  _this.data.is_pass;
                    temp.id = _this.data.id
                    try {
                        wx.setStorageSync('item', temp)
                      } catch (e) {console.log(e) }
                      wx.navigateTo({
                        url:'../apprInfo/apprInfo'
                    })
                    // app.globalData.itemInfo = temp
                    // console.log(app.globalData.itemInfo)
                }
            })
        },


})