var app = getApp()
Page({
  data: {
    hidden: false,
    curNav: 1,
    curIndex: 0,
    cart: [],
    cartTotal: 0,
    navList: [
      {
        id: 1,
        name: '石膏板吊顶'
      },
      {
        id: 2,
        name: '矿棉板吊顶'
      },
      {
        id: 3,
        name: '贴面板吊顶'
      },
      {
        id: 4,
        name: '600铝板吊顶'
      },
      {
        id: 5,
        name: '石膏板隔断'
      },
      {
        id: 6,
        name: '乳胶漆粉刷'
      },
      {
        id: 7,
        name: '塑料格栅吊顶'
      },
      {
        id: 8,
        name: '铁格栅吊顶'
      },
      {
        id: 9,
        name: '铝格栅吊顶'
      },
      {
        id: 10,
        name: '30铝板吊顶'
      },
    ],
    dishesList: [
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 11 },
        { src: "https://api.ceiling.wanwukj.cn/images/02.jpg", biref: "50副骨", num: 1, id: 12 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 13 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id: 14 },
        { src: "https://api.ceiling.wanwukj.cn/images/05.jpg", biref: "6#帽", num: 1, id: 15 },
        { src: "https://api.ceiling.wanwukj.cn/images/06.jpg", biref: "8#帽", num: 1, id: 16 },
        { src: "https://api.ceiling.wanwukj.cn/images/07.jpg", biref: "8#拉爆", num: 1, id: 17 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "8#吊杆", num: 1, id: 18 },
        { src: "https://api.ceiling.wanwukj.cn/images/09.jpg", biref: "泰山石膏板9.5mm", num: 1, id: 19 },
        { src: "https://api.ceiling.wanwukj.cn/images/09.jpg", biref: "泰山石膏板12mm", num: 1, id: 19 },
        { src: "https://api.ceiling.wanwukj.cn/images/09.jpg", biref: "无醛石膏板9.5mm", num: 1, id: 19 },
        { src: "https://api.ceiling.wanwukj.cn/images/10.jpg", biref: "自攻丝", num: 1, id: 20 },
        { src: "https://api.ceiling.wanwukj.cn/images/011.jpg", biref: "U型边骨", num: 1, id: 21 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 22 },
        { src: "https://api.ceiling.wanwukj.cn/images/012.jpg", biref: "烤漆主骨", num: 1, id: 23 },
        { src: "https://api.ceiling.wanwukj.cn/images/012.jpg", biref: "烤漆副骨", num: 1, id: 24 },
        { src: "https://api.ceiling.wanwukj.cn/images/014.jpg", biref: "烤漆边骨", num: 1, id: 25 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 26 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id: 27 },
        { src: "https://api.ceiling.wanwukj.cn/images/05.jpg", biref: "6#帽", num: 1, id: 28 },
        { src: "https://api.ceiling.wanwukj.cn/images/015.jpg", biref: "6#子弹", num: 1, id: 29 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "6#吊杆", num: 1, id: 30 },
        { src: "https://api.ceiling.wanwukj.cn/images/017.jpg", biref: "38反烤漆", num: 1, id: 31 },
        { src: "https://api.ceiling.wanwukj.cn/images/018.jpg", biref: "矿棉板1.4mm防潮", num: 1, id: 32 },
        { src: "https://api.ceiling.wanwukj.cn/images/018.jpg", biref: "矿棉板1.4mm", num: 1, id: 32 },
        { src: "https://api.ceiling.wanwukj.cn/images/018.jpg", biref: "矿棉板1.2mm", num: 1, id: 32 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 33 },
        { src: "https://api.ceiling.wanwukj.cn/images/012.jpg", biref: "烤漆主骨", num: 1, id: 34 },
        { src: "https://api.ceiling.wanwukj.cn/images/012.jpg", biref: "烤漆副骨", num: 1, id: 35 },
        { src: "https://api.ceiling.wanwukj.cn/images/014.jpg", biref: "烤漆边骨", num: 1, id: 36 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 37 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id: 38 },
        { src: "https://api.ceiling.wanwukj.cn/images/05.jpg", biref: "6#帽", num: 1, id: 39 },
        { src: "https://api.ceiling.wanwukj.cn/images/015.jpg", biref: "6#子弹", num: 1, id: 40 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "6#吊杆", num: 1, id: 41 },
        { src: "https://api.ceiling.wanwukj.cn/images/017.jpg", biref: "38反烤漆", num: 1, id: 42 },
        { src: "https://api.ceiling.wanwukj.cn/images/019.jpg", biref: "双信贴面板", num: 1, id: 43 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 44 },
        { src: "https://api.ceiling.wanwukj.cn/images/020.jpg", biref: "三角龙骨", num: 1, id: 45 },
        { src: "https://api.ceiling.wanwukj.cn/images/021.jpg", biref: "铝边线", num: 1, id: 46 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 47 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id: 48 },
        { src: "https://api.ceiling.wanwukj.cn/images/05.jpg", biref: "6#帽", num: 1, id: 39 },
        { src: "https://api.ceiling.wanwukj.cn/images/015.jpg", biref: "8#子弹", num: 1, id: 40 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "8#吊杆", num: 1, id: 41 },
        { src: "https://api.ceiling.wanwukj.cn/images/022.jpg", biref: "三角吊件", num: 1, id: 42 },
        { src: "https://api.ceiling.wanwukj.cn/images/023.jpg", biref: "60*60 0.6mm铝板", num: 1, id: 43 },
        { src: "https://api.ceiling.wanwukj.cn/images/023.jpg", biref: "60*60 0.7mm铝板", num: 1, id: 43 },
        { src: "https://api.ceiling.wanwukj.cn/images/023.jpg", biref: "60*60 0.8mm铝板", num: 1, id: 43 },
      ], [
        { src: "https://api.ceiling.wanwukj.cn/images/024.jpg", biref: "75竖骨", num: 1, id: 47 },
        { src: "https://api.ceiling.wanwukj.cn/images/025.jpg", biref: "75天地", num: 1, id: 48 },
        { src: "https://api.ceiling.wanwukj.cn/images/025.jpg", biref: "38穿骨", num: 1, id: 39 },
        { src: "https://api.ceiling.wanwukj.cn/images/027.jpg", biref: "75支撑卡", num: 1, id: 40 },
        { src: "https://api.ceiling.wanwukj.cn/images/09.jpg", biref: "泰山石膏板9.5mm", num: 1, id: 19 },
        { src: "https://api.ceiling.wanwukj.cn/images/09.jpg", biref: "泰山石膏板12mm", num: 1, id: 19 },
        { src: "https://api.ceiling.wanwukj.cn/images/09.jpg", biref: "无醛石膏板9.5mm", num: 1, id: 19 },
        { src: "https://api.ceiling.wanwukj.cn/images/10.jpg", biref: "自攻丝", num: 1, id: 42 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/028.jpg", biref: "腻子粉", num: 1, id: 41 },
        { src: "https://api.ceiling.wanwukj.cn/images/029.jpg", biref: "立邦工程漆", num: 1, id: 42 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 71 },
        { src: "https://api.ceiling.wanwukj.cn/images/014.jpg", biref: "烤漆边骨", num: 1, id: 72 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 73 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id:74 },
        { src: "https://api.ceiling.wanwukj.cn/images/05.jpg", biref: "6#帽", num: 1, id: 75 },
        { src: "https://api.ceiling.wanwukj.cn/images/015.jpg", biref: "6#子弹", num: 1, id: 76 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "6#吊杆", num: 1, id: 77 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "150塑料格栅", num: 1, id: 78 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "100塑料格栅", num: 1, id: 79 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 81 },
        { src: "https://api.ceiling.wanwukj.cn/images/014.jpg", biref: "烤漆边骨", num: 1, id:82 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 83 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id: 84 },
        { src: "https://api.ceiling.wanwukj.cn/images/05.jpg", biref: "6#帽", num: 1, id: 85 },
        { src: "https://api.ceiling.wanwukj.cn/images/015.jpg", biref: "6#子弹", num: 1, id: 86 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "6#吊杆", num: 1, id: 87 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "150铁格栅", num: 1, id: 88 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "100铁格栅", num: 1, id: 89 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 91 },
        { src: "https://api.ceiling.wanwukj.cn/images/014.jpg", biref: "烤漆边骨", num: 1, id: 92 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 93 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id: 94 },
        { src: "https://api.ceiling.wanwukj.cn/images/05.jpg", biref: "6#帽", num: 1, id:95 },
        { src: "https://api.ceiling.wanwukj.cn/images/015.jpg", biref: "6#子弹", num: 1, id:96 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "6#吊杆", num: 1, id:97 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "150铝格栅", num: 1, id:98 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "100铝格栅", num: 1, id: 99 },
      ],
      [
        { src: "https://api.ceiling.wanwukj.cn/images/01.jpg", biref: "38主骨", num: 1, id: 44 },
        { src: "https://api.ceiling.wanwukj.cn/images/020.jpg", biref: "三角龙骨", num: 1, id: 45 },
        { src: "https://api.ceiling.wanwukj.cn/images/021.jpg", biref: "铝边线", num: 1, id: 46 },
        { src: "https://api.ceiling.wanwukj.cn/images/03.jpg", biref: "38大吊", num: 1, id: 47 },
        { src: "https://api.ceiling.wanwukj.cn/images/04.jpg", biref: "穿丝", num: 1, id: 48 },
        { src: "https://api.ceiling.wanwukj.cn/images/015.jpg", biref: "6#子弹", num: 1, id: 40 },
        { src: "https://api.ceiling.wanwukj.cn/images/016.jpg", biref: "8#吊杆", num: 1, id: 41 },
        { src: "https://api.ceiling.wanwukj.cn/images/022.jpg", biref: "三角吊件", num: 1, id: 42 },
        { src: "https://api.ceiling.wanwukj.cn/images/0004.jpg", biref: "玻璃免钉胶", num: 1, id: 42 },
        { src: "https://api.ceiling.wanwukj.cn/images/0003.jpg", biref: "LED长灯", num: 1, id: 42 },
        { src: "https://api.ceiling.wanwukj.cn/images/0002.jpg", biref: "LED吊灯", num: 1, id: 42 },
        { src: "https://api.ceiling.wanwukj.cn/images/0001.jpg", biref: "浴霸", num: 1, id: 42 },
        { src: "https://api.ceiling.wanwukj.cn/images/0005.jpg", biref: "30铝板", num: 1, id: 42 },
      ]
    ],
    dishes: []
  }
  ,
  loadingChange() {
    setTimeout(() => {
      this.setData({
        hidden: true
      })
    }, 2000)
  },
  selectNav(event) {
    let id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
 
  selectDish(event) {
    let dish = event.currentTarget.dataset.dish;
    let flag = true;
    let cart = this.data.cart;

    if (cart.length > 0) {
      cart.forEach(function (item, index) {
        if (item == dish) {
          cart.splice(index, 1);
          flag = false;
        }
      })
    }
    if (flag) cart.push(dish);
    this.setData({
      cartTotal: cart.length
    })
    this.setStatus(dish)
  },
  setStatus(dishId) {
    let dishes = this.data.dishesList;
    for (let dish of dishes) {
      dish.forEach((item) => {
        if (item.id == dishId) {
          item.status = !item.status || false
        }
      })
    }

    this.setData({
      dishesList: this.data.dishesList
    })
  },
  onLoad() {
    this.loadingChange()
  }
  
})