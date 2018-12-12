//城市选择
var app = getApp();
Page({
    data: {
        shengArr: [],//省级数组
        shengId: [],//省级id数组
        shiArr: [],//城市数组
        shiId: [],//城市id数组
        quArr: [],//区数组
        shengIndex: 0,
        shiIndex: 0,
        quIndex: 0,
        mid: 0,
        sheng: 0,
        city: 0,
        area: 0,
        code: 0,
        cartId: 0
    },

    formSubmit: function (e) {
        var adds = e.detail.value;
        var that = this;
        var cartId = this.data.cartId;
        console.log("cartid : " + cartId);
        wx.request({
            //   url: 'https://api.ceiling.wanwukj.cn/Ceiling/address/add.do',
            url: '',
            data: {
                openId: wx.getStorageSync("open_id"),
                receiver: adds.name,
                phone: adds.phone,
                province: adds.province,
                city: adds.city,
                area: adds.town,
                adds: adds.address,
                code: this.data.code,
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {// 设置请求的 header
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                // success
                console.log(res)
                var status = res.data.state;
                if (status == 1) {
                    wx.showToast({
                        title: '保存成功！',
                        duration: 2000
                    });
                } else {
                    wx.showToast({
                        title: res.data.data.message,
                        duration: 2000
                    });
                }
                wx.redirectTo({
                    url: 'user-address/user-address?salt=' + that.data.salt
                });
            },
           
        })
    },

    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        var that = this;
        console.log(options)
        console.log("页面开始加载")
        //调用应用实例的方法获取全局数据
        // console.log("hdsgk : " + wx.getStorageSync('open_id'))
        //获取省级城市
        wx.request({
            url: 'https://api.ceiling.wanwukj.cn/Ceiling/dict/get_provinces.do',
            data: {},
            method: 'POST',
            success: function (res) {
                var status = res.data.state;
                var province = res.data.data;
                console.log("province : " + province)
                var sArr = [];
                var sId = [];
                sArr.push('请选择');
                sId.push('0');
                for (var i = 0; i < province.length; i++) {
                    sArr.push(province[i].provinceName);
                    sId.push(province[i].provinceCode);
                }
                that.setData({
                    shengArr: sArr,
                    shengId: sId
                })
            },
            // fail: function () {
            //     // fail
            //     wx.showToast({
            //         title: '网络异常！',
            //         duration: 2000
            //     });
            // },
        })

    },

    bindPickerChangeshengArr: function (e) {
        console.log("bindPickerChangshengArr : " + e.detail.value.cityCode)
        this.setData({
            shengIndex: e.detail.value,
            shiArr: [],
            shiId: [],
            quArr: [],
            quiId: []
        });
        var that = this;
        wx.request({
            //http://localhost:8088/Ceiling/dict/get_provinces.do
            url: 'https://api.ceiling.wanwukj.cn/Ceiling/dict/get_city.do',
            data: { provinceId: e.detail.value },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {// 设置请求的 header
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data.data)
                var status = res.data.state;
                var city = res.data.data;
                var hArr = [];
                var hId = [];
                hArr.push('请选择');
                hId.push('0');
                for (var i = 0; i < city.length; i++) {
                    hArr.push(city[i].cityName);
                    hId.push(city[i].cityCode);
                }
                that.setData({
                    sheng: res.data.sheng,
                    shiArr: hArr,
                    shiId: hId
                })
            },
            fail: function () {
                // fail
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            },

        })
    },

    bindPickerChangeshiArr: function (e) {
        console.log("bindPickerChangeshiArr : " + e.detail.value)

        this.setData({
            shiIndex: e.detail.value,
            quArr: [],
            quiId: []
        })
        var that = this;
        var data = that.data.shiId[e.detail.value];
        console.log(data)
        wx.request({
            //'http://localhost:8088/Ceiling/dict/get_city.do'
            url: 'https://api.ceiling.wanwukj.cn/Ceiling/dict/get_areas.do',
            data: {
                cityCode: data
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {// 设置请求的 header
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {

                if (res != null) {
                    var status = res.data.state;
                    var area = res.data.data;
                    var qArr = [];
                    var qId = [];
                    qArr.push('请选择');
                    qId.push('0');
                    for (var i = 0; i < area.length; i++) {
                        qArr.push(area[i].areaName)
                        qId.push(area[i].cityCode)
                    }
                    that.setData({
                        city: res.data.city,
                        quArr: qArr,
                        quiId: qId
                    })
                } else {
                    return false;
                }
            },
            // fail: function () {
            //     // fail
            //     wx.showToast({
            //         title: '网络异常！',
            //         duration: 2000
            //     });
            // }
        })
    },

    bindPickerChangequArr: function (e) {
        console.log(this.data.city)
        this.setData({
            quIndex: e.detail.value
        });
        var that = this;
        wx.request({
            url: 'https://api.ceiling.wanwukj.cn/Ceiling/dict/get_areas.do',
            // url: app.d.ceshiUrl + '/Api/Address/get_code',
            data: {
                quyu: e.detail.value,
                city: this.data.city
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {// 设置请求的 header
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                that.setData({
                    area: res.data.area,
                    code: res.data.code
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
    }

})