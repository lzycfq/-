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
    multiArray: [['石膏板', '矿棉板', '贴面板', '塑料格栅', '铁格栅', '铝格栅', '600铝板', '300铝板'], ['无醛石膏板9.5mm', '泰山石膏板9.5mm','泰山石膏板12mm']],
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
            data.multiArray[1] = ['无醛石膏板9.5mm', '泰山石膏板9.5mm', '泰山石膏板12mm'];
            break;
          // 矿棉板
          case 1:
            data.multiArray[1] = ['厚度1.2','厚度1.4','防潮1.4'];
            break;
          // 贴面板
          case 2:
            data.multiArray[1] = ['双信贴面板'];
            break;
          // 塑料格栅
          case 3:
            data.multiArray[1] = ['100*100','150*150'];
            break;
          // 铁格栅
          case 4:
            data.multiArray[1] = ['100*100', '150*150'];
            break;
          // 铝格栅
          case 5:
            data.multiArray[1] = ['100*100', '150*150'];
            break;
          // 600铝板
          case 6:
            data.multiArray[1] = ['厚度0.6mm', '厚度0.7mm', '厚度0.8mm'];
            break;
          // 300铝板
          case 7:
            data.multiArray[1] = ['300mm*300mm'];
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
    var aa=0
    console.log("daa===" + that.data.multiIndex)
    console.log('form发生了submit事件，携带数据为：', e.detail.value, that.data.multiIndex);
    // 厨房
    wx.navigateTo({
        url: '../form/form?length=' + e.detail.value.length + '&width=' + e.detail.value.width + '&index=' +       aa+ '&index1=' + that.data.multiIndex[0] + '&index2=' + that.data.multiIndex[1] + '&array=' + lists,
    })
  },
})