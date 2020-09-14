// ../appraisal/appraisal.js
const app = getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        kind:'',
        expert: '',
        text: '',
        start: 0,   //传输图片成功的次数，如果上传传输成功则置0
        time: 0 ,   //图片完成数，不论成功与否，代替i计数，上传完成置0
        reload:0,   //上传次数，若为0则是初次上传，上传成功则置0

        id:0,       //任务id
        idBack: '', //id-backup
        input_max: 200,
        token:'',

        errList:[],

        uploaderList: [],
        uploaderNum: 0,
        showUpload: true,

        select_dataset:null,

        show:true,
        //自定义eval数组测试
        eval: [],

        //存放选择对应的藏品的专家数组
        selectArrayExpert: []

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


    onLoad: function () {
        let that = this
        that.queryClass()
    },


    getExpert: function (e) {
        const expert_array = e.currentTarget.dataset.expert_array;
        const index = e.detail;

        console.log(expert_array[index]);
        this.setData({
            id:expert_array[index].id,
            idBack:expert_array[index].id,
            selectArrayExpert: expert_array[index].expert,
            select_dataset:expert_array[index]
        })
        console.log(this.data.id);
        this.data.kind = expert_array[index].kind
        console.log('kind:')
        console.log(this.data.kind)
        console.log(expert_array[index].kind)
    },

    getExpertIndex:function(e){
        //对应专家价钱:
        const index = e.detail;
        console.log(index)
        
        const select_dataset = this.data.select_dataset.price;
        const price = select_dataset[index];
        this.data.expert = price.price
        console.log(this.data.expert)

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
        console.log(now)
        if(this.data.idBack[index].id < 10 ){
            this.setData({
                id:'0'+this.data.idBack[index].id + now,
                idBack : '0'+this.data.idBack[index].id + now
            })
        }
        if(this.data.idBack[index].id >= 10 ){
            this.setData({
                id:''+this.data.idBack[index].id + now,
                idBack : ''+this.data.idBack[index].id + now
            })
        }
        app.globalData.id = this.data.id
        console.log(this.data.id);
    },


    //控制200以内
    countText(e) {
        this.setData({
            limitNum: e.detail.cursor
        })
        // console.log(e.detail)
        if (e.detail.cursor == 200) {
            wx.showModal({
                title: '提示',
                content: '您已达到输入上限',
            })
        }
    },

    getText(e) {
        this.data.text = e.detail.value
        console.log('text:  ' + this.data.text)
    },


    //删除图片
    clearImg: function (e) {
        var nowList = [];//新数据
        var uploaderList = this.data.uploaderList;//原数据
        for (let i = 0; i < uploaderList.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                continue;
            } else {
                nowList.push(uploaderList[i])
            }
        }
        this.setData({
            uploaderNum: this.data.uploaderNum - 1,
            uploaderList: nowList,
            showUpload: true
        })
    },
    //展示图片
    showImg: function (e) {
        var that = this;
        wx.showLoading({
            title: '请稍等',
            mask: true
        })
        wx.previewImage({
            urls: that.data.uploaderList,
            current: that.data.uploaderList[e.currentTarget.dataset.index],
            success(res){
                wx.hideLoading({})
            },
            fail(res){
                wx.hideLoading({})
            }
        })
    },
    //上传图片
    addImg: function (e) {
        var that = this;
        

        // setTimeout(function () {
        //     wx.showLoading({
        //         title: '图片加载中..',
        //         mask: true,
        //     })
        //   }, 1000)
        wx.chooseImage({
            count: 9 - that.data.uploaderNum, // 默认9
            sizeType: ['original'],
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // wx.hideLoading({})
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.uploaderList.concat(tempFilePaths);
                if (uploaderList.length == 9) {
                    that.setData({
                        showUpload: false
                    })
                }
                that.setData({
                    uploaderList: uploaderList,
                    uploaderNum: uploaderList.length,
                })
            },
            fail(res){
                // wx.hideLoading({})
            }
        })
        
    },


    check() {
        let _this = this
        if (_this.data.kind != '' && _this.data.expert != '' && _this.data.text != '' && _this.data.uploaderList != '') {
            console.log('ok')
            
            _this.uploadInfo()

        } else {
            wx.showModal({
                title: '提示',
                content: '请填写所有条目后提交'
            })
        }
    },

        // const promise = new Promise(function(resolve, reject) {
    //     // ... some code
      
    //     if (true){
    //       resolve(value);
    //     } else {
    //       reject(error);
    //     }
    // },


    // promise.then(function(value) {
    //     // success
    //   }, function(error) {
    //     // failure
    //   }),


//上传鉴定信息和图片
uploadInfo() {
    wx.showLoading({
        title: '提交中',
        mask: true
    })
    let _this = this

    wx.request({
      url: 'https://www.yufuculture.com/api/count/',
      data:{
        start: _this.data.start
      },
      success(res){
        //res.data.code 如果start为0则返回正常         **********************
          console.log(res)
        //服务器计数,当日流水单号
        console.log(parseInt(res.data.code))

        //判读是否为失败重传，则不需要新的任务id，若为初次上传，则为id赋值
        if(res.data.code != 0){
            //随机数后缀，防止并发问题
            var tt = Math.random()
            tt = Math.ceil(tt*99)
            console.log(tt)
            
            //合成任务id
            if(parseInt(res.data.code) <1000){
                _this.setData({
                    id : _this.data.idBack + '0' + parseInt(res.data.code) + tt,
                })

                if(parseInt(res.data.code) <100){
                    _this.setData({
                        id : _this.data.idBack + '00' + parseInt(res.data.code) + tt,
                    })

                    if(parseInt(res.data.code) <10){
                        _this.setData({
                            id : _this.data.idBack + '000' + parseInt(res.data.code) + tt,
                        })
                    }
                }
            }
            if(parseInt(res.data.code) >1000){
                _this.setData({
                    id : _this.data.idBack  + parseInt(res.data.code) + tt,
                })
            }
        }

        //打印任务id
        app.globalData.id = _this.data.id
        console.log(app.globalData.id)
        _this.setData({
            token : app.globalData.token
        })

        //任务流id - - 修改
        // console.log(_this.data.start)
        // if(_this.data.start == 0){
        //     app.globalData.id = _this.data.id
        // }

    
        //打印要上传的图片临时路径
        var tempfilePaths = _this.data.uploaderList
        console.log(_this.data.uploaderList)
    
        //设置应上传的任务起始点
        // var i = 0
        // //如果为失败重传
        // if(_this.data.start != 0){
        //     //首张上传失败的图片
        //     _this.setData({
        //         start:1
        //     })
        //     i = _this.data.errList[_this.data.start-1]
        // }
        //上传错误计数
        var count = 0;
        //重传计数
        var errcount = 0;
        //开始循环上传图片
        for (let i=0; i < _this.data.uploaderList.length; i++) {

            //如果为失败重传,修改结束条件
            if(_this.data.errList[0] != undefined && _this.data.reload !=0){
                //首次重传失败的图片
                if(i == 0){
                    count= 0;
                    errcount= 0;
                    _this.setData({
                        start: 0,
                        time: 0
                    })
                }
                //每次循环
                i = _this.data.errList[errcount]
                //重传完成
                if(_this.data.errList[errcount] == undefined ){
                    break;
                }

                errcount++


                // //重传完成
                // if(_this.data.errList[errcount] == undefined ){
                //     //重传成功
                //     if(_this.data.start == _this.data.errList.length){
                //         _this.setData({
                //             start:0,
                //             time:0,
                //             errList:[]
                //         })
                //         wx.redirectTo({
                //             url: "../record/record"
                //         })
                //     }
                //     //重传失败
                //     else{
                //         wx.showModal({
                //             title: '错误',
                //             content: '服务器写入失败',
                //             confirmText: '重试',
                //             cancelText:'取消',
                //             success (res) {
                //               if (res.confirm) {
                //                 console.log('用户点击确定')
                //                 wx.showLoading({
                //                     title: '提交中',
                //                 })
                //                 //再次上传
                //                 _this.uploadInfo()


                //               } else if (res.cancel) {
                //                 console.log('用户点击取消')
                //               }
                //             }
                //           })
                //     }
                // }


                
            }

    
            //获取文件后缀名 - exten
            var exten = tempfilePaths[i].split('.');
            exten = exten[exten.length - 1]

            //开始上传
            const uploadTask = wx.uploadFile({
                url: 'https://www.yufuculture.com/api/submit/',
                filePath: tempfilePaths[i],
                name: 'file',
                timeout: 100000,
                header: {'content-type': 'application/json'},
                formData: {
                    'kind': _this.data.kind,
                    'expert': _this.data.expert,
                    'text': _this.data.text,
                    'exten': exten,
                    'id': app.globalData.id,
                    'num': i,
                    'open_id': app.globalData.openid,
                    'token': _this.data.token
                },
                success(res) {
                    //传输成功 ， time +1
                    _this.setData({
                        time: _this.data.time + 1
                    })
                    console.log('上传时的num'+i)
                    console.log(_this.data.start)
                    console.log(_this.data.time)
                    console.log(_this.data.errList)

                    //token过期，重新获取
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

                    //打印id，看是否起效为上传失败id
                    console.log(app.globalData.id)
                    console.log(res)
                    //分离出code上传状态
                    var tmp = res.data.split('"')
                    var num0 = parseInt(tmp[5])
                    console.log(num0)
                    tmp = tmp[2]
                    tmp = tmp.split(',')
                    tmp = tmp[0]
                    tmp = tmp.split(' ')
                    tmp = tmp[1]
                    
                    console.log(_this.data.start)

                    //这张图片上传成功
                    if(tmp == '1'){
                        //服务器写入成功，start 累计+1
                        _this.setData({
                            start : _this.data.start+1
                        })
                        console.log(_this.data.start)

                        //分离获得token
                        tmp = res.data.split('"')
                        tmp = tmp[tmp.length - 2]
                        console.log(tmp)
                        _this.setData({
                            token : tmp
                        })
                        console.log(_this.data.token)
                        //**初次** 上传图片总数 === 已成功上传数 ， 则此次任务成功
                        console.log(_this.data.start)
                        if(_this.data.uploaderList.length == _this.data.start){
                            wx.hideLoading()
                            count = 0
                            errcount = 0;
                            _this.setData({
                                start : 0,
                                time: 0,
                                errList:[],
                                reload:0,
                            })
                            console.log(_this.data.start)
                            app.globalData.token = _this.data.token
                            wx.redirectTo({
                                url: "../record/record"
                            })
                        }
                        //**重传** 上传图片数 == 待重传数 ， 则此次任务成功
                        if(_this.data.errList.length == _this.data.start && _this.data.reload !=0){
                            wx.hideLoading()
                            count = 0
                            errcount = 0;
                            _this.setData({
                                start : 0,
                                time: 0,
                                errList:[],
                                reload:0
                            })
                            console.log(_this.data.start)
                            app.globalData.token = _this.data.token
                            wx.redirectTo({
                                url: "../record/record"
                            })
                        }
                    }
                    //这张图片上传写入失败
                    else{
                        _this.data.errList[count] = num0
                        count++;
                        console.log(_this.data.errList)
                        
                    }
                    //**重传** 全部上传成功，且有上传失败，数据置0
                    if(_this.data.time == _this.data.errList.length && _this.data.reload !=0){
                        count = 0
                        errcount = 0;
                        _this.setData({
                            time:0,
                            reload: _this.data.reload+1
                        })
                        console.log(_this.data.errList)
                        wx.hideLoading()
                        wx.showModal({
                            title: '错误',
                            content: '服务器写入失败',
                            confirmText: '重试',
                            cancelText:'取消',
                            success (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                wx.showLoading({
                                    title: '提交中',
                                })
                                //再次上传
                                _this.uploadInfo()


                              } else if (res.cancel) {
                                console.log('用户点击取消')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.yufuculture.com/api/cancel/',
                                    data: { id: app.globalData.id},
                                    success(res){console.log(res)}
                                })
                              }
                            }
                          })
                    }

                    //**初次** 全部上传成功，且有上传失败，数据置0
                    if(_this.data.time == _this.data.uploaderList.length){
                        count = 0
                        errcount = 0;
                        _this.setData({
                            time:0,
                            reload: _this.data.reload+1
                        })
                        console.log(_this.data.errList)
                        wx.hideLoading()
                        wx.showModal({
                            title: '错误',
                            content: '服务器写入失败',
                            confirmText: '重试',
                            cancelText:'取消',
                            success (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                wx.showLoading({
                                    title: '提交中',
                                })
                                //再次上传
                                _this.uploadInfo()


                              } else if (res.cancel) {
                                console.log('用户点击取消')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.yufuculture.com/api/cancel/',
                                    data: { id: app.globalData.id},
                                    success(res){console.log(res)}
                                })
                              }
                            }
                          })
                    }
                },
                fail(res){
                    // _this.data.errList[count] = num0
                    count++;
                    console.log(res)
                    if(res.errMsg == 'uploadFile:fail socket timeout error' && count == _this.data.uploaderList.length){
                        wx.hideLoading()
                        _this.setData({
                            start : 0,
                            time: 0,
                            errList:[],
                            reload:0
                        })
                        wx.showModal({
                            title: '提示',
                            content: '已超时，请刷新重试'
                          })
                    }
                    //仅上传一张且失败 或 最后一张上传失败
                    if(_this.data.time == _this.data.uploaderList.length ){
                        _this.setData({
                            time:0
                        })
                        console.log(_this.data.errList)
                        wx.hideLoading()
                        wx.showModal({
                            title: '错误',
                            content: '上传失败',
                            confirmText: '确定',
                            cancelText:'取消',
                            success (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.yufuculture.com/api/cancel/',
                                    data: { id: app.globalData.id},
                                    success(res){console.log(res)}
                                })
                              } else if (res.cancel) {
                                console.log('用户点击取消')
                                count = 0
                                errcount = 0;
                                _this.setData({
                                    start : 0,
                                    time: 0,
                                    errList:[],
                                    reload:0
                                })
                                //删除之前数据库不完整数据
                                wx.request({
                                    url: 'https://www.yufuculture.com/api/cancel/',
                                    data: { id: app.globalData.id},
                                    success(res){console.log(res)}
                                })
                              }
                            }
                          })
                    }
                }
            })
            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度', res.progress)
            })
        }



      }
    })


},






    queryAll() {
        wx.request({
            url: 'https://www.yufuculture.com/api/eval/',
            data: {
                open_id: app.globalData.openid,
                is_pass: 4
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("res.data:   " + res.data)
                var urls = res.data.code
                console.log("res.data.code:   " + urls)
                urls = urls[0]
                console.log("res.data.code[0]:   " + urls)
                urls = urls.url
                console.log("res.data.code[0].url:   " + urls)
            }

        })
    },

    //鉴定详情
    detail() {
        wx.request({
            url: 'https://www.yufuculture.com/api/detail/',
            data: {
                open_id: app.globalData.openid,
                id: app.globalData.random
            },
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log("res.data:   " + res.data)
                var urls = res.data.code
                var uul
                console.log("res.data.code:   " + urls)
                uul = urls[0]
                console.log("res.data.code[0]:   " + uul)
                uul = urls[0].url
                console.log("res.data.code[0].url:   " + uul)
                uul = urls[0].eval_person
                console.log("res.data.code[0].eval_person:   " + uul)
            }

        })
    },




    //获取类别
    queryClass() {
        let _this = this
        wx.request({
            url: 'https://www.yufuculture.com/api/sort',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success(res) {
                console.log(res.data)
                _this.setData({
                    eval:res.data.code
                })
                console.log(res.data)
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



    backGet(){
        wx.request({
          url: 'https://www.yufuculture.com/api/admin/Eval/',
          data:{
              id:'6116',
              Eval_person:'X-professor',
              Eval_name:'helmet',
              Eval_age:'1982',
              Eval_level:'O',
              Eval_price:'priceless',
              Eval_result:'this is a helmet which Eric wears all the time .',
              status:'1'
          },
          success(res){
              console.log('ok')
              console.log(res)
          }
        })
    },

    expertOp(){
        wx.request({
            url: 'https://www.yufuculture.com/api/admin/sort/',
            data:{
                method:'1',
                kind:'青铜',
                expert:'李四',
                price:'0'
            },
            success(res){
                console.log('ok')
                console.log(res)
            }
          })
    }

})