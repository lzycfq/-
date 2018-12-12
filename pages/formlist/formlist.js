Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: [],
        totalPrice: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var id = options.orderId
        console.log(id)
        wx.request({
            url: 'https://api.ceiling.wanwukj.cn/Decoration/order/handle_order_details.do',
            data: {
                id: id,
                //   wx.getStorageSync("open_id")
                openId: wx.getStorageSync("open_id")
            },
            success: function (res) {
                console.log(res)
                if (res.data.state) {
                    var result = res.data.data
                    console.log(result.json)
                    if (result.json){
                        console.log(result.json)
                        var a = result.json
                        that.setData({
                            listData: a,
                            judgment:true,
                            totalPrice: result.totalPrice
                        })
                    }
                    console.log(res)
                    that.setData({
                        judgment: false,
                        details:res.data.data
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})