// pages/address/user-address/user-address.js
var app = getApp()
Page({
  data: {
    address:[],
    addresss: '',
    name:'',
    phone:'',
    radioindex: '',
    pro_id: 0,
    num: 0,
    cartId: 0,
    dat: "",
    totalPrice: '',
    orderNumbers: '',
    lists: [],
    val:"",
    dat:[]
  },
  onLoad: function (options) {
    var that = this;
    var openId = wx.getStorageSync("open_id")
    console.log("s123s=="+openId)
     wx.request({
       url: 'https://api.ceiling.wanwukj.cn/Decoration/order/get_recv_address.do',
       data: { openId: wx.getStorageSync("open_id")},
       success:function(res){
         console.log(res.data.data)
         console.log(res.data.data.recvAddress)
         var addresss = res.data.data.recvAddress
         var name = res.data.data.recvName
         var phone = res.data.data.recvPhone
         that.setData({
           addresss: addresss,
           name: name,
           phone: phone
         })
       }

     })

    var val = options.val
    var orderNumbers = options.orderNumbers
    console.log("val++++====" + orderNumbers)
    that.setData({
      val:val,
      orderNumbers: orderNumbers
    })
    
    // 页面初始化 options为页面跳转所带来的参数
    var cartId = options.cartId;
    console.log("1")
    console.log(app.d.userId);
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var address = res.data.adds;
        console.log("123456789")
        console.log(address);
        if (address == '') {
          var address = []
        }

        that.setData({
          address: address,
          cartId: cartId,
        })
      },
      // fail: function () {
      //   // fail
      //   wx.showToast({
      //     title: '网络异常！',
      //     duration: 2000
      //   });
      // }
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  setDefault: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/set_default',
      data: {
        uid: app.d.userId,
        addr_id: addrId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var status = res.data.status;
        var cartId = that.data.cartId;
        if (status == 1) {
          if (cartId) {
            wx.redirectTo({
              url: '../../order/pay?cartId=' + cartId,
            });
            return false;
          }

          wx.showToast({
            title: '操作成功！',
            duration: 2000
          });

          that.DataonLoad();
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  delAddress: function (e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Address/del_adds',
          data: {
            user_id: app.d.userId,
            id_arr: addrId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {// 设置请求的 header
            'Content-Type': 'application/x-www-form-urlencoded'
          },

          success: function (res) {
            // success
            var status = res.data.status;
            if (status == 1) {
              that.DataonLoad();
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
    });

  },
  DataonLoad: function () {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {// 设置请求的 header
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {
        // success
        var address = res.data.adds;
        console.log("0")
        console.log(address)
        if (address == '') {
          var address = []
        }
        that.setData({
          address: address,
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })

  },
  editAddress: function (event) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        console.log("3")
        console.log(res);
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: null
        }
        console.log("4")
        console.log(addressInfo)
        var addresss=res.provinceName+res.cityName+res.countyName+res.detailInfo
        var name=res.userName
        var phone=res.telNumber
        that.setData({
          dat:res,
          addresss: addresss,
          name: name,
          phone: phone
        })
        console.log("1=" + that.data.dat)
      }
    })
  },
//保存地址
saveAddress:function(){
  var that=this
    var dat = that.data.dat
    console.log(that.data.name)
    console.log(that.data.orderNumbers)
    var data = {
      recvName: that.data.name,
      recvAddress: that.data.addresss,
      recvPhone: that.data.phone,
      openId: wx.getStorageSync("open_id"),
      orderNumber: that.data.orderNumbers
  
  }
 
 //https://api.ceiling.wanwukj.cn
  //http://192.168.0.103:8080
  console.log(data)
  wx.request({
    url: 'https://api.ceiling.wanwukj.cn/Decoration/order/set_recv_address.do',
    data: data,
    success:function(res){
      if(res.data.state==1){
           wx.navigateTo({
               url: '../../ent/ent?asd='+true,
           })
      console.log('OK')
      }
      console.log(res)
    }
  })
}

})