Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  map: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: 34.745760,
          longitude: 113.710630,
          scale: 28,
          name: "郑州海龙吊顶"
        })
      }
    })
  },
// 呼叫功能
  mobile: function () {
    wx.makePhoneCall({
      phoneNumber: '0371-66512135'
    })
  },
})