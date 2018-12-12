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
    banner:[
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
    multiArray: [['石膏板', '集成吊顶'], ['无醛石膏板9.5mm', '泰山石膏板9.5mm', '泰山石膏板12mm']],
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
                data.multiArray[1] = ['300铝板'];
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
    var aa=0
    var bb=7
    var lists = that.data.multiArray[0][that.data.multiIndex[0]] + "——" + that.data.multiArray[1][that.data.multiIndex[1]]
    console.log(lists)
    console.log("daa===" + that.data.multiIndex[0])
    console.log("daa===" + that.data.multiIndex[1])
    console.log('form发生了submit事件，携带数据为：', e.detail.value, that.data.multiIndex);
    // 厨房
    
      if (that.data.multiIndex[0]==0){
        wx.navigateTo({
            url: '../form/form?length=' + e.detail.value.length + '&width=' + e.detail.value.width + '&index=' + aa + '&index1=' + that.data.multiIndex[0]+ '&index2=' + that.data.multiIndex[1] + '&array=' + lists,
        })
      }else{
        wx.navigateTo({
            url: '../form/form?length=' + e.detail.value.length + '&width=' + e.detail.value.width + '&index=' + aa + '&index1=' +bb + '&index2=' + that.data.multiIndex[1] + '&array=' + lists,
        })
      
   
    }
  },
  
})//17664729447