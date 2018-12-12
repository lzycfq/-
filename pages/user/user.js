// pages/user/user.js
var app = getApp()
Page( {
  data: {
    orderInfo:{},
    hasUserInfo:wx.getStorageSync('userInfo'),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
      var that = this
      console.log(that.data.canIUse)
      console.log(this.data.hasUserInfo)
      console.log(this.data.canIUse)
      if (app.globalData.userInfo) {
          console.log('index -> onLoad -> if ' + app.globalData.userInfo)
          this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
          })
      } else if (this.data.canIUse) {
          console.log('index -> onLoad -> else if ' + this.data.canIUse)
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
              console.log('sss')
              console.log(res)
              this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
              })
          }
      } else {
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
              success: res => {
                  console.log('wx.getUserInfo')
                  console.log(res)
                  app.globalData.userInfo = res.userInfo
                  this.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                  })
              }
          })
      }
      //调用应用实例的方法获取全局数据
      // this.loadOrderStatus();
      that.save()
  },

  save:function(){
      var that = this
    //   this.data.hasUserInfo
      console.log(that.data.hasUserInfo.nickName)
      var nickName = that.data.hasUserInfo.nickName
      var avaterUrl = that.data.hasUserInfo.avatarUrl
    wx.request({
        url: 'http://127.0.0.1:8080/ZhongHe/resave.do',
        data: {
            nickName: nickName,
            avaterUrl: avaterUrl
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
            console.log(res)
        },
        fail: function(res) {},
        complete: function(res) {},
    })
  },
  onShow:function(){
    // this.loadOrderStatus();
  },
  loadOrderStatus:function(){
    //获取用户订单数据
    var that = this;
  },
  getUserInfo: function (e) {
    var that = this
    console.log(e)
      console.log(this.data.hasUserInfo)
      console.log('page->getUserInfo')
      console.log(e)
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
      })
      that.userLogin()
  },
  listOne:function(){
    wx.navigateTo({
      url: '../user/dingdan',
    })
  },
  
  userLogin :function(){
    wx.login({
      success:function(res){
        console.log(res)
        var code = res.code
        console.log(code)
        wx.request({
        //   url: 'https://api.ceiling.wanwukj.cn/Decoration/user/login.do?code=' + code,
            url: 'https://api.ceiling.wanwukj.cn/Decoration/user/login.do?code=' + code,
          method:'POST',
          success:function(res){
            console.log(res)
          
            wx.setStorageSync('open_id', res.data.data.open_id)
          }
        })
      }
    })
  }
})