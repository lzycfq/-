// pages/prompt/index.js
var app = getApp()
var tabInitState = [false, false]
Page({
  data: {
    motto: 'MiHome_Store',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 600,
    banner: [
      {
        "pic_url": "https://api.ceiling.wanwukj.cn/images/1.png",
      },
      {
        "pic_url": "https://api.ceiling.wanwukj.cn/images/2.png",
      },
      {
        "pic_url": "https://api.ceiling.wanwukj.cn/images/3.png",
      },
    ],
    multiArray: [['乳胶漆'], ['立邦工程漆']],
    multiIndex: [0, 0],
    onLoad: function () {
      console.log('onLoad')
    }
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    console.log('====' + data.multiArray)
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['立邦工程漆'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  onLoad: function () {
    var that = this
    //更新数据
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
      loadingHidden: true
    })
  },
  formSubmit: function (e) {
    var that = this
    var lists = that.data.multiArray[0][that.data.multiIndex[0]] + "——" + that.data.multiArray[1][that.data.multiIndex[1]]
    console.log(lists)
    var aa=2
    console.log("daa===" + that.data.multiIndex)
    console.log('form发生了submit事件，携带数据为：', e.detail.value, that.data.multiIndex);
    // 厨房
    var op = wx.getStorageSync("open_id");
   
    wx.navigateTo({
        url: '../form/form?length=' + e.detail.value.length + '&width=' + e.detail.value.width + '&index=' + aa + '&index1=' + that.data.multiIndex[0] + '&index2=' + that.data.multiIndex[1] + '&array=' +lists,
    })
    
  },
})