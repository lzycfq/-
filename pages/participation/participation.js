// pages/prompt/index.js
var app = getApp()
Page({
  data: {
    motto: 'MiHome_Store',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 600,
    // banner_list也是data的属性(JS语法)
    "banner_list": [
      {
        "banner": [
          {
            "title": "我的订单",
            "pic_url": "../images/02.jpg",
            "url": "../all_orders/all_orders"
          },
        ]
      },
      {
        "banner": [
          {
            "title": "购物车",
            "pic_url": "../images/02.jpg",
            "url": "../shopping/shopping"
          },
        ]
      },
      {
        "banner": [
          {
            "title": "地址管理",
            "pic_url": "../images/02.jpg",
            "url": ""
          },
        ]
      },
      {
        "banner": [
          {
            "title": "账户管理",
            "pic_url": "../images/02.jpg",
            "url": ""
          },
        ]
      },
      {
        "banner": [
          {
            "title": "联系我们",
            "pic_url": "../images/02.jpg",
            "url": ""
          },
        ]
      },
    ],
    onLoad: function () {
      console.log('onLoad')
    }
  }

})

