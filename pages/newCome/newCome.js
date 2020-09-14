const app = getApp()
Page({
    data: {
        uploaderList: [],
        uploaderNum:0,
        showUpload:true,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),

        nickName:'',
        avatarUrl:'',
        context:"予复公众号在线鉴定功能，是为了方便各位藏友交流学习，而由予复讲堂在2020年8月推出的一项线上图片鉴赏服务（以下简称为本服务）。\n" +
            "\t为满足各位藏友交流学习，为大家提供更优质的服务，本服务从上线之日起长期有效，并不断更新优化，《予复公众号在线鉴定用户协议》（以下简称本服务）也将根据本服务内容，不断更新。\n" +
            "\t为明确本服务提供方和服务使用方的权利和义务，保证服务提供方和使用方的合法权益，特对各方权利和义务做以下声明（服务提供方简称乙方，服务使用方简称甲方）：\n" +
            "甲方：\n" +
            "1、使用本服务，视为知晓并同意本协议全部内容\n" +
            "2、古玩是非标行业，没有统一标准，所有鉴定专家凭个人经验鉴定，同一件物品存在不同意见和争议是正常现象。\n" +
            "3、图片鉴定受到拍摄的角度、光线等影响，会影响鉴定结果的准确性，图片鉴定无法代替实物鉴定。\n" +
            "4、本服务提供的鉴定结果，仅供藏友之间交流和学习使用，不作为实际交易和校验价格的依据，若甲方擅自使用本服务的鉴定结果作为实际交易的凭据，不论依据本服务出售商品，还是依据本服务购买商品，若造成损失，系甲方个人行为，乙方不承担任何直接责任和连带责任。\n" +
            "5、甲方需自行判断本服务真伪，对于第三方公司或个人伪造本服务，或打着予复品牌提供山寨服务的，甲方需自行判断，对第三方公司或个人提供的山寨服务产生的后果，乙方不承担责任，并保留追究侵权者责任的权利。\n" +
            "6、甲方提供鉴定的图片所有权，请甲方自行保证，若使用侵权图片，产生的法律后果，由甲方承担，乙方保留后续通过法律手段追责的权利\n" +
            "7、甲方上传图片，必须为需要鉴定的藏品图片，不得出现无关图片，一次鉴定仅上传一件物品。若图片内含有黄赌毒等非法内容，乙方有权向公安机关报案，并保留证据。\n" +
            "乙方：\n" +
            "1、乙方本着方便甲方交流学习的目的，提供本服务，本服务的结果仅供交流学习，乙方不对鉴定结果和由鉴定结果产生的后续行为负责。\n" +
            "2、乙方提供本服务可能会在予复讲堂、予复鉴定等多个公众号和平台上线。不承诺使用平台和范围。\n" +
            "3、乙方保留未来对该服务收费的权利\n" +
            "4、对于免费服务，乙方不承诺本服务的可用性，不承诺鉴定回复时间。\n" +
            "5、对于付费服务，乙方承诺甲方已付费鉴定物品，可以在平台上获取到鉴定结果，但不承诺鉴定结果在平台上永久可访问，对于历史鉴定结果，如甲方需要，请甲方自行保存。\n" +
            "6、对于甲方上传的图片，乙方默认甲方拥有该图片的所有权和使用权，甲方将图片提交给乙方，视为同意乙方在图片上添加水印，并视为同意乙方将该图片在平台内使用（如藏品展示、鉴定结果展示等等）。乙方承诺不将图片用于其他与本服务无关的场景。如果甲方上传图片，不具备所有权而导致侵权，甲方保留向乙方追责的权利。\n" +
            "7、乙方定期审查甲方上传内容，若出现与鉴定无关的图片或文字、语音，乙方有权删除甲方的鉴定记录，并不返还任何费用。若甲方上传的文字、语音、图片涉及到违法内容，乙方有权保留证据，并向公安机关报案。\n" +
            "\n" +
            "本协议自2020.8.1期生效。"
    },
    showPopup() {
        this.popup.showPopup();
    },
    //取消事件
    _error() {
        console.log('你点击了取消');
        this.selectComponent("#popup").hidePopup();
    },
    //确认事件
    _success() {
        console.log('你点击了确定');
        this.selectComponent("#popup").hidePopup();
    },
    // 删除图片
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
    upload: function(e) {
        var that = this;
        wx.chooseImage({
            count: 9 - that.data.uploaderNum, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                console.log(res)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;

                var tt = res.tempFilePaths;
                
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
                var exten = uploaderList[0].split('.');
                exten = exten[exten.length - 1]
                console.log(exten)
            }
        })
    },

    change(){
        wx.request({
          url: 'https://www.yufuculture.com/api/admin/sort/',
          header: {
            'content-type': 'application/json'
        },
        data:{
            method:0,
            kind:'鼎',
            expert:'李明',
        },
        success(res){
            console.log(res)
            console.log(res.data.code)
        }
        })
    },

    //给第一张图片，再用show_detail得到余下的9张
    getInfo(){
        wx.request({
            url: 'https://www.yufuculture.com/api/admin/give_eval/',
            header: {
                'content-type': 'application/json'
            },
            methodL:'GET',
            data: {
                expert:'asdg'
            },
            success(res) {
                console.log("res.data:   " + res.data)
                var tt = res.data
                console.log(tt)
                // var urls = res.data.code
                // var uul
                // console.log("res.data.code:   " + urls)
                // uul = urls[0]
                // console.log("res.data.code[0]:   " + uul)
                // uul = urls[0].url
                // console.log("res.data.code[0].url:   " + uul)
            }
        })
    },


    onLoad: function() {

    },

    getUserInfo(){
        let _this = this
        wx.getSetting({
            withSubscriptions: true,
            success(res){
              if(res.authSetting['scope.userInfo']){
                  wx.getUserInfo({
                    success(res){
                        _this.setData({
                            nickName:res.userInfo.nickName,
                            avatarUrl:res.userInfo.avatarUrl
                        })
                        app.globalData.userInfo.userInfo = res.userInfo
                        app.globalData.userInfo.nickName = res.userInfo.nickName
                        app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                        console.log(app.globalData.userInfo.userInfo)
                        console.log(_this.data.nickName)
                        console.log(_this.data.avatarUrl)
                        wx.request({
                            url: 'https://www.yufuculture.com/api/userInfo/',
                            data: {
                                nickName:_this.data.nickName,
                                avatarUrl:_this.data.avatarUrl,
                                open_id:app.globalData.openid,
                                telNum:''
                            },
                            header: {
                                'content-type': 'application/json',
                            },
                            success(res) {
                                wx.switchTab({
                                    url:'../index/index'
                                  })
                            }
                        })
                    }
                  })
              }
            },
        })

        

    },

    
})