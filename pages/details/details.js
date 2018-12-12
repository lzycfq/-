Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    num:1,
    minusStatus:'disable',
    datas:'',
    da:"",
    orderNumber:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    var list=[];
    list.push(options.demo)
    list.push(options.biref)
    list.push(options.id)
    list.push(options.num)
    console.log(list);
    this.setData({
      list:list
    })
    var that=this
    wx.request({
      url: 'https://api.ceiling.wanwukj.cn/Decoration/handel_product_details.do',
      data:{materialName:list[1]},
      success:function (result){
        var data = result.data.data[0].productPrice
        console.log(data)
        that.setData({
          datas: data,
          da:data
        })
      }
      
    })

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
  
  //支付接口
  payement: function (options) {
    var that = this
    console.log("ss")

    var money = that.data.da;
    // var orderNumber = options.detail.value.order_number;
    var product = that.data.list[1]
    // console.log(that.data.userInfo.openid)
    console.log("123456789==+1=" + wx.getStorageSync("open_id"))
    var op = wx.getStorageSync("open_id");
    if (op == null || op == '') {
      console.log("hAOLE")
      wx.showModal({
        title: '温馨提示',
        content: '必须先进入‘我的’页面进行登录才能购买哦！',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../user/user',
            })
          }
          console.log("你好")
        }
      })
    } else {

    wx.request({
      url: 'https://api.ceiling.wanwukj.cn/Decoration/order/wxPay.do',
      data: {
        money: money,//钱数
        orderNumber: that.data.orderNumber,//订单编号
        product: "吊顶材料",
        openId: wx.getStorageSync("open_id"),//openid
      },
      success: function (res) {
        // console.log(wx.getStorageSync("open_id"))
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
  // 减号减少
  bindMinus: function () {
    var price = this.data.datas
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      da: (price * num).toFixed(2),
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    var price=this.data.datas
    this.setData({
      num: num,
      da: (price * num).toFixed(2),
      minusStatus: minusStatus
    })
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var price = this.data.datas
    var minusStatus = num > 1 ? 'normal' : 'disable';
   
    this.setData({
      num: num,
      da: (price * num).toFixed(2),
      minusStatus: minusStatus
    })
   
  },
  saveOrder:function(){
    var that = this
    console.log(111111111111112222222222222)
    // console.log(wx.getStorageSync("open_id"))
    var data = ''
    var openId = wx.getStorageSync("open_id");
    if (openId == null || openId == '') {
      wx.showModal({
        title: '请先授权登录!',
        content: 2000,
      })
    } else {
    data = {
      openId: wx.getStorageSync("open_id"),
      orderName: that.data.list[1],
      counts: that.data.num,
      totalPrice: that.data.da,
      orderNumber: that.data.orderNumber
    }
    wx.request({
      url: 'https://api.ceiling.wanwukj.cn/Decoration/order/generate_order.do',
      method:"GET",
      data: data,
      header:{
        'content-type' : 'application/json'
      },
      success: function (res) {
        console.log("ok")
        var orderNumber= that.data.orderNumber
        console.log(that.data.orderNumber)
        wx.navigateTo({
          url: '../address/user-address/user-address?orderNumbers=' + that.data.orderNumber
        })
      }
    })
    }
  },
  senten:function(){
    wx.navigateTo({
      url: '../address/user-address/user-address',
    })
  },
generation:function(){
  var that = this
  wx.request({
    url: 'https://api.ceiling.wanwukj.cn/Decoration/order/generate_order.do',
    method: "GET",
    data: {
      openId: wx.getStorageSync("open_id"),
      orderName: that.data.list[1],
      orderDetails: that.data.num,
      counts: that.data.da,
      orderNumber: that.data.orderNumber
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log("ok")
      wx.navigateTo({
        url: '../address/user-address/user-address?'
      })
    }
  })
}
})