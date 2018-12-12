Page({
  data: {
    flag: '请联系客服支付',
    code: null
  },
  payement: function (options) {
    console.log(options);
    var that = this
    var openid = wx.getStorageSync("open_id")
    console.log(openid)
    wx.request({
      url: '',
      data: {
        money: 5,
        orderNumber: 56132,
        openId: openid,
      },
      success: function (res) {
        console.log(res.data.data)
        that.doPay(res.data.data)
      }
    })
  },

  doPay(param) {
    var that = this
    console.log(param);
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: 'MD5',
      paySign: param.paySign,

      success: function (res) {
        console.log("最后支付")
        console.log(res)
        that.changeOrderIdPay(orderId);
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("支付页onLoad:"+options.price)
    var that = this;
    wx.setDate({
      price: options.price
    })
  },
  
}) 