//index.js
//获取应用实例
var app = getApp()
var tabInitState = [false, false, false]
Page({
  data: {
    motto: 'MiHome_Store',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    counts: '',
    curSelClassifyIndex: 0,
    "banner_list": [
      {
        // 顶部图片轮播
        "banner": [
          {
            "pic_url": "https://api.ceiling.wanwukj.cn/images/1.png",
          },
          {
            "pic_url": "https://api.ceiling.wanwukj.cn/images/2.png",
          },
          {
            "pic_url": "https://api.ceiling.wanwukj.cn/images/3.png",
          },

        ]
      },
      {
        "banner": [
          {
            "title": "家装配料",
            "pic_url": "../images/it1.png",
            "url": "../event/event"
          },
          {
            "title": "工装配料",
            "pic_url": "../images/it2.png",
            "url": "../events/events"
          },
          {
            "title": "零售材料",
            "pic_url": "../images/it3.png",
            "url": "../ent/ent"
          },
          {
            "title": "联系我们",
            "pic_url": "../images/it4.png",
            "url": "../relation/relation"
          },

        ]
      },
    ],
    multiArray: [['吊顶', '隔断', '刷墙'], ['石膏板', '矿棉板', '贴面板', '塑料格栅', '铁格栅', '铝格栅', '600铝板', '300铝板'], ['无醛石膏板9.5mm', '泰山石膏板9.5mm', '泰山石膏板12mm']],
    multiIndex: [0, 0, 0]
  },

  onLoad: function () {
    console.log('onLoad')

  },
  saishi: function (event) {
    var id = null;
    wx.navigateTo({
        url: '../event/event',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '吊顶材料自助配料计算器',
      path: '/pages/index/index',
      imageUrl: '../images/zf.png',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
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
            data.multiArray[1] = ['石膏板', '矿棉板', '贴面板', '塑料格栅', '铁格栅', '铝格栅', '600铝板', '300铝板'];
            data.multiArray[2] = ['无醛石膏板9.5mm', '泰山石膏板9.5mm', '泰山石膏板12mm'];
            break;
          case 1:
            data.multiArray[1] = ['石膏板'];
            data.multiArray[2] = ['无醛石膏板9.5mm', '泰山石膏板9.5mm', '泰山石膏板12mm'];
            break;
          case 2:
            data.multiArray[1] = ['乳胶漆'];
            data.multiArray[2] = ['立邦工程漆'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              // 无醛石膏板
              case 0:
                data.multiArray[2] = ['无醛石膏板9.5mm', '泰山石膏板9.5mm', '泰山石膏板12mm'];
                break;
              case 1:
                data.multiArray[2] = ['厚度1.2', '厚度1.4', '防潮1.4'];
                break;
              // 贴面板
              case 2:
                data.multiArray[2] = ['双信贴面板'];
                break;
              // 塑料格栅
              case 3:
                data.multiArray[2] = ['100*100', '150*150'];
                break;
              // 铁格栅
              case 4:
                data.multiArray[2] = ['100*100', '150*150'];
                break;
              // 铝格栅
              case 5:
                data.multiArray[2] = ['100*100', '150*150'];
                break;
              // 600铝板
              case 6:
                data.multiArray[2] = ['厚度0.6mm', '厚度0.7mm', '厚度0.8mm'];
                break;
              // 300铝板
              case 7:
                data.multiArray[2] = ['300mm*300mm'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['无醛石膏板9.5mm', '泰山石膏板9.5mm', '泰山石膏板12mm'];
                break;
            }
            break;
          case 2:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['立邦工程漆'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  onLoad: function () {
    var that = this
    //更新数据
    wx.request({
    //   url: 'https://api.ceiling.wanwukj.cn/Decoration/user/count_user.do',
      success: function (res) {
        console.log("000000000")
        console.log(res.data.data)
        var counts = res

        that.setData({
          counts: res.data.data.visitors
        })
      }
    })
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
      loadingHidden: true
    })

  },
  formSubmit: function (e) {
    var that = this
    var lists = that.data.multiArray[0][that.data.multiIndex[0]] + "——" + that.data.multiArray[1]       [that.data.multiIndex[1]] + "——" + that.data.multiArray[2][that.data.multiIndex[2]]
    console.log(lists)
    console.log("daa===" + that.data.multiIndex)
    console.log('form发生了submit事件，携带数据为：', e.detail.value, that.data.multiIndex);
    // 厨房
     var op = wx.getStorageSync("open_id");
     console.log("sss==="+op)
    wx.navigateTo({
        url: '../form/form?length=' + e.detail.value.length + '&width=' + e.detail.value.width + '&index=' + that.data.multiIndex[0] + '&index1=' + that.data.multiIndex[1] + '&index2=' + that.data.multiIndex[2] + '&array=' + that.data.multiArray[1][that.data.multiIndex[1]],
    })

  },
})
