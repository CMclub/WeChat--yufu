Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /*组件的属性列表*/
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: ''
    },
    is_read:{
      type:Boolean
    }
  },
  /* 组件的初始数据 */
  data: {
    flag: true,
    bgOpacity:0,
    wrapAnimate:'wrapAnimate',
    popupAnimate:'popupAnimate'
  },
  /* 组件的方法列表 */
  methods: {
    //隐藏弹框
    hidePopup: function () {
      const that = this;
      this.setData({ bgOpacity: 0.7, wrapAnimate: "wrapAnimateOut", popupAnimate:"popupAnimateOut"})
      setTimeout(function(){
        that.setData({flag: false})
      },1200)
    },
    showPopup:function(){
      const that = this;
      var check = this.data.flag;
      check=!check;
      this.setData({ bgOpacity: 0, wrapAnimate: "wrapAnimate", popupAnimate:"popupAnimate"})
      setTimeout(function(){
        that.setData({flag: check})
      },1200)
    },
    /* 内部私有方法建议以下划线开头 triggerEvent 用于触发事件 */
    _ok() {//触发_ok回调
      this.triggerEvent("ok")
    }
  }
})
