// ../appraisal/appraisal.js
const app = getApp()


Page({

    /**
     * 页面的初始数据
     */
    data: {
        eval:[
            {kind: ''},
            {expert: ''},
            {text: ''},
            {id: 0},
            {userInput:''},
            {input_max:200},
        ],

            uploaderList:[],
            uploaderNum:0,
            showUpload:true,


        selectArrayType: [{
            "text": "陶瓷"
        }, {
            "text": "青花瓷"
        }, {
                "text": "其他瓷器"
        },{"text": "铁器"
            }
        ],

        selectArrayExpert: [{
            "id": "1",
            "text": "专家1"
        }, {
            "id": "2",
            "text": "专家2"
        }, {
            "id": "3",
            "text": "专家3"
        }
        ]

    },



    // onLoad: function () {
    //     let that = this
    //     app.getUserInfo(function (userInfo) {
    //         that.setData({
    //             userInfo: userInfo
    //         })
    //     })
    // },

    getKind(e) {
        let _this = this
        _this.data.eval.kind = e.detail
        console.log('类别： ' + _this.data.eval.kind)
    },

    getExpert(e) {
        let _this = this
        _this.data.expert = e.detail
        console.log('专家： ' + _this.data.expert)
    },

    //控制200以内
    countText(e) {
        this.setData({
            limitNum: e.detail.cursor
        })
        console.log(e.detail)
        if(e.detail.cursor == 200){
            wx.showModal({
              title: '提示',
              content: '您已达到输入上限',
            })
        }
    },

    getText(e) {
        this.data.text = e.detail.value
        console.log('text:  '+this.data.text)
    },

    // chooseImages() {
    //     let this1 = this
    //     wx.chooseImage({
    //         count: 9,
    //         sizeType: ['original'],
    //         success(res) {
    //             this1.data.tempfilePaths = res.tempFilePaths
    //             this1.data.tempfiles = res.tempFiles
    //             var tt = this1.data.tempfiles
    //             console.log('filepaths:  '+this1.data.tempfilePaths)
    //             console.log('files:  '+tt)

    //             wx.previewImage({
    //               urls: this1.data.tempfilePaths,
    //             })
    //         }
    //     })
    // },


    //删除图片
    clearImg:function(e){
        var nowList = [];//新数据
        var uploaderList = this.data.uploaderList;//原数据
        for (let i = 0; i < uploaderList.length;i++){
            if (i == e.currentTarget.dataset.index){
                continue;
            }else{
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
    showImg:function(e){
        var that=this;
        wx.previewImage({
            urls: that.data.uploaderList,
            current: that.data.uploaderList[e.currentTarget.dataset.index]
        })
    },
    //上传图片
    addImg: function(e) {
        var that = this;
        wx.chooseImage({
            count: 9 - that.data.uploaderNum, // 默认9
            sizeType: ['original'],
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                console.log(res)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                let uploaderList = that.data.uploaderList.concat(tempFilePaths);
                if (uploaderList.length==9){
                    that.setData({
                        showUpload:false
                    })
                }
                that.setData({
                    uploaderList: uploaderList,
                    uploaderNum: uploaderList.length,
                })
                console.log(uploaderList)
                console.log(e.currentTarget.dataset.index)
            }
        })
    },


    check(){
        let _this = this
        if(_this.data.kind != '' && _this.data.expert != '' && _this.data.text != '' && _this.data.uploaderList != '')
        {
            console.log('ok')
            //uploadInfo
        }
        else{
            wx.showModal({
                title:'提示',
                content:'请填写所有条目后提交'
              })
        }
    },


//上传鉴定信息和图片
    uploadInfo() {
        var num1 = Math.random()
        var num2 = Math.random()
        num1 = num1 * 10000
        num2 = num2 * 10000
        num1 = Math.floor(num1)
        num2 = Math.floor(num2)
        app.globalData.random = num1 + num2
        console.log('id:  '+app.globalData.random)

        let _this = this
        //传输id
        var idd = _this.data.id + 1
        _this.data.id = idd


        var tempfilePaths = _this.data.uploaderList
        var i = 0
        for (i; i < _this.data.uploaderList.length; i++) {
            console.log('&&&&&&&&&   ' + i)
            //获取文件后缀名 - exten
            var exten = uploaderList[0].split('.');
            exten = exten[exten.length - 1]

            console.log(tempfilePaths[i])

            wx.showLoading({
                title: '加载中',
            })

            const uploadTask = wx.uploadFile({
                url: 'http://www.shoolos.cn:8000/api/submit/',
                filePath: tempfilePaths[i],
                name: 'file',
                timeout: 3000,
                header: {'content-type': 'application/json'},
                formData: {
                    'kind': _this.data.kind,
                    'expert': _this.data.expert,
                    'text': _this.data.text,
                    'exten': exten,
                    'id': app.globalData.random,
                    'num': i,
                    'open_id': app.globalData.openid
                },
                success(res) {
                    const data = res.data
                    console.log(data)
                    console.log(res.statusCode)
                    console.log('id   ' + _this.data.id)
                    console.log('第' + i + '个')
                }
            })

            uploadTask.onProgressUpdate((res) => {
                //console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                //console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })
        }
        wx.hideLoading()
    },


    downLoad() {
        wx.request({
            url: 'http://www.shoolos.cn:8000/api/download/',
            header: {
                'content-type': 'application/json'
            },
            success(res) {

                console.log('data' + res.data)
                var down = 'http://www.shoolos.cn:8000/api/' + res.data
                console.log(down)
                wx.downloadFile({
                    url: down,
                    timeoutL: 1000,
                    success(res) {
                        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                        if (res.statusCode === 200) {
                            const downloadTask = wx.downloadFile({
                                url: 'http://www.eric0.com/icon-work-file.ico', //仅为示例，并非真实的资源
                                success(res) {

                                }
                            })

                            downloadTask.onProgressUpdate((res) => {
                                console.log('下载进度', res.progress)
                                console.log('已经下载的数据长度', res.totalBytesWritten)
                                console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
                            })
                        }
                    }
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     获取用户信息和openid*/
    onLoad: async function () {

        var _this = this
        wx.login({
            success(res) {
                if (res.code) {
                    //获取用户信息
                    wx.getUserInfo({
                        success: function (res) {
                            app.globalData.userInfo = res.userInfo
                            app.globalData.nickName = userInfo.nickName
                            app.globalData.avatarUrl = userInfo.avatarUrl
                            app.globalData.gender = userInfo.gender
                            app.globalData.province = userInfo.province
                            app.globalData.city = userInfo.city
                            app.globalData.country = userInfo.country
                        }
                    })
                    //获取用户openid
                    wx.request({
                        url: 'http://www.shoolos.cn:8000/api/user/',
                        data: {
                            code: res.code
                        },
                        header: {
                            'content-type': 'application/json'
                        },
                        success(res) {
                            var obj = JSON.parse(res.data.openid)
                            app.globalData.openid = obj.openid  //设置openid , 全局变量
                            console.log(app.globalData.openid)
                        }

                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },


    queryAll() {
        wx.request({
            url: 'http://www.shoolos.cn:8000/api/eval/',
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

                //var obj = JSON.parse(res.data.openid)

                // for(i; i<)
                // console.log('data'+res.data)
                // var down = 'http://www.shoolos.cn:8000/api/'+res.data
                // console.log(down)
                // wx.downloadFile({
                //     url: down,
                //     timeoutL:1000,
                //     success (res) {
                //       // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                //       if (res.statusCode === 200) {
                //         const downloadTask = wx.downloadFile({
                //           url: 'http://www.eric0.com/icon-work-file.ico',
                //           success (res) {

                //           }
                //         })

                //         downloadTask.onProgressUpdate((res) => {
                //           console.log('下载进度', res.progress)
                //           console.log('已经下载的数据长度', res.totalBytesWritten)
                //           console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
                //         })
                //       }
                //     }
                //   })
            }

        })
    },

    //鉴定详情
    detail() {
        wx.request({
            url: 'http://www.shoolos.cn:8000/api/detail/',
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

                //var obj = JSON.parse(res.data.openid)

                // var url_r =
                // var i= 0

                // for(i; i<)
                // console.log('data'+res.data)
                // var down = 'http://www.shoolos.cn:8000/api/'+res.data
                // console.log(down)
                // wx.downloadFile({
                //     url: down,
                //     timeoutL:1000,
                //     success (res) {
                //       // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                //       if (res.statusCode === 200) {
                //         const downloadTask = wx.downloadFile({
                //           url: 'http://www.eric0.com/icon-work-file.ico',
                //           success (res) {

                //           }
                //         })

                //         downloadTask.onProgressUpdate((res) => {
                //           console.log('下载进度', res.progress)
                //           console.log('已经下载的数据长度', res.totalBytesWritten)
                //           console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
                //         })
                //       }
                //     }
                //   })
            }

        })
    },


    //围观
    show() {
        wx.request({
            url: 'http://www.shoolos.cn:8000/api/show/',
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
                uul = urls[0].id
                console.log("res.data.code[0].url:   " + uul)
                uul = urls[0].eval_name
                console.log("res.data.code[0].url:   " + uul)

                //var obj = JSON.parse(res.data.openid)

                // var url_r =
                // var i= 0

                // for(i; i<)
                // console.log('data'+res.data)
                // var down = 'http://www.shoolos.cn:8000/api/'+res.data
                // console.log(down)
                // wx.downloadFile({
                //     url: down,
                //     timeoutL:1000,
                //     success (res) {
                //       // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                //       if (res.statusCode === 200) {
                //         const downloadTask = wx.downloadFile({
                //           url: 'http://www.eric0.com/icon-work-file.ico',
                //           success (res) {

                //           }
                //         })

                //         downloadTask.onProgressUpdate((res) => {
                //           console.log('下载进度', res.progress)
                //           console.log('已经下载的数据长度', res.totalBytesWritten)
                //           console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
                //         })
                //       }
                //     }
                //   })
            }

        })
    },


    //围观详情
    show_detail() {
        wx.request({
            url: 'http://www.shoolos.cn:8000/api/show_detail/',
            header: {
                'content-type': 'application/json'
            },
            data: {
                id: app.globalData.random
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


                //var obj = JSON.parse(res.data.openid)

                // var url_r =
                // var i= 0

                // for(i; i<)
                // console.log('data'+res.data)
                // var down = 'http://www.shoolos.cn:8000/api/'+res.data
                // console.log(down)
                // wx.downloadFile({
                //     url: down,
                //     timeoutL:1000,
                //     success (res) {
                //       // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                //       if (res.statusCode === 200) {
                //         const downloadTask = wx.downloadFile({
                //           url: 'http://www.eric0.com/icon-work-file.ico',
                //           success (res) {

                //           }
                //         })

                //         downloadTask.onProgressUpdate((res) => {
                //           console.log('下载进度', res.progress)
                //           console.log('已经下载的数据长度', res.totalBytesWritten)
                //           console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
                //         })
                //       }
                //     }
                //   })
            }

        })
    },

    //获取类别
    queryClass() {
        wx.request({
            url: 'http://www.shoolos.cn:8000/api/sort',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success(res) {
                console.log(res.data)
                //console.log(res.data)
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }

})