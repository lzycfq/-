// pages/form/index.js
var app = getApp()
Page({
  data: {
    listData: [],
    tittle: '',
    totals: '',
    orderNumber: '',
    pingfang: '',
    pingprice: '',
    gongmoney: ""
  },
  
  onLoad: function (options) {
    var that = this
    console.log(options.data)
    var tittle = options.array


    that.setData({
      tittle: tittle,
      length: options.length,
      width: options.width

    })
    var datas = {
      length: options.length,
      width: options.width,
      indexs: options.index,
      types: options.index1,
      model: options.index2
    }
    console.log(datas)
    that.jisuan(datas)

    wx.request({
      url: 'https://api.ceiling.wanwukj.cn/Decoration/order/generate_order_number.do',
      success: function (res) {
        var orderNumber = res.data.data.orderNumber
        console.log(res.data.data.orderNumber)
        that.setData({
          orderNumber: orderNumber
        })
      }
    })
  },

  jisuan(datas) {
    var that = this
    var length = datas.length
    var width = datas.width
    console.log("length=" + length + "      width=" + width)
    //http://192.168.0.103:8080
    wx.request({
      url: 'https://api.ceiling.wanwukj.cn/Decoration/handle_mateial_details.do',
      data: datas,
      success: function (res) {

        console.log(res.data.data)
        var list = res.data.data
        if (list.length == 0 || list == null) {
        //   that.jisuan(datas)
        } else {
          var aa = res.data.data
          var totals = 0

          for (var i in list) {
            totals += list[i].total
          }
          that.setData({
            listData: aa,
            totals: totals.toFixed(2),
            pingfang: (length * width).toFixed(3),
            pingprice: (totals / (length * width)).toFixed(2),
            gongmoney: ((length * width) * 25).toFixed(2)
          })
        }
      }
    })

  },


  saveOrder() {
    var that = this
    var data = ''
    var openId = wx.getStorageSync("open_id");
    console.log("ssss=============================================" + openId)

    data = {
      openId: openId,
      orderName: that.data.tittle,
      orderDetails: that.data.listData,
      totalPrice: that.data.totals,
      orderNumber: that.data.orderNumber
    }

    wx.request({
      url: 'https://api.ceiling.wanwukj.cn/Decoration/order/generate_order.do',
      data: data,
      success: function (res) {
        console.log(res)
        wx.navigateTo({
          url: '../address/user-address/user-address?orderNumbers=' + that.data.orderNumber
        })
      }
    })
  },
  //支付接口
  payement: function (options) {
    var that = this
    console.log("ss")
    var op = wx.getStorageSync("open_id");
    console.log(op)
    if (op == null || op == '') {
      console.log("hAOLE")
      wx.showModal({
        title: '温馨提示',
        content: '必须先进入‘我的’页面进行登录才能支付哦！',
        success: function (res) {
              console.log(res.confirm)
              if (res.confirm) {
            wx.navigateTo({
              url: '../user/user'
            })
          }else{
          console.log("你好")
          }
        }
      })
    } else {
      var money = that.data.totals;
      console.log(money)
      var product = that.data.tittle
    //   console.log(wx.getStorageSync("open_id"))
      wx.request({
        url: 'https://api.ceiling.wanwukj.cn/Decoration/order/wxPay.do',
        data: {
          money: money,//钱数
          orderNumber: that.data.orderNumber,//订单编号
          product: "吊顶材料",
          openId: wx.getStorageSync("open_id"),//openid
        },
        success: function (res) {
          console.log("123456789")
        //   console.log(wx.getStorageSync("open_id"))
          console.log(res.data.data)
          that.doPay(res.data.data)
        }
      })
    }
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

        if (res.errMsg === 'requestPayment:ok') {
          that.saveOrder()
        } else {
          console.log('支付失败')
        }
        console.log("最后支付")
        console.log(res)

      }
    })
  },


})