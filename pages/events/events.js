var app = getApp()
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
    listFor: [
      {
        "title": "我要吊顶",
        "url": "../vprompt/vprompt"
      }, {
        "title": "我要隔断",
        "url": "../prompts/prompts"
      }, {
        "title": "我要粉刷",
        "url": "../advisory/index"
      },
    ],
    onLoad: function () {
      console.log('onLoad')
    }
  }

})
