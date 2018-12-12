// app.js
App({
    d: {
        hostUrl: '',
        hostImg: 'http://img.ynjmzb.net',
        hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
        userId: 1,
        appId: "",
        appKey: "",
        ceshiUrl: 'https://wxplus.paoyeba.com/index.php',
    },
    onLaunch: function () {
        console.log(this.globalData.userInfo)
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
        //login
        wx.getSetting({
            success: res => {
                console.log(res)
                wx.setStorageSync('login_status', res.authSetting['scope.userInfo'])
                console.log(wx.getStorageSync('login_status'))
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            console.log('getUserInfor ->')
                            console.log(res)
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
        // this.userLogin();
    },
    userLogin: function () {
        wx.login({
            success: function (res) {
                console.log(res)
                var code = res.code
                console.log(code)
                wx.request({
                    url: 'https://api.ceiling.wanwukj.cn/Decoration/user/login.do?code=' + code,
                    method: 'POST',
                    success: function (res) {
                        console.log(res)
                        var status = res.data.state
                        if (status) {
                            wx.setStorageSync('open_id', res.data.data.open_id)
                        }
                    }
                })
            }
        })
    },
    getUserInfo: function (cb) {
        var that = this
        wx.login({
            success: function (res) {
                console.log(res)
                var code = res.code;
                //打桩输出
                console.log("wx.login->code : " + code)
                that.getUserSessionKey(code)
            }
        });
    },

    /**
     * 获取用户会话密匙
    */
    getUserSessionKey: function (code) {
        console.log("getUserSessionKey->code : " + code)
        //用户的订单状态
        var that = this;
        console.log("getUserSessionKey URL : " + that.d.ceshiUrl + '/Api/Login/getsessionkey')
        wx.request({
            /**
              * 将获取到的用户的code发送到后端
              * 后端处理调用微信接口处理用户信息的获取
            */
            // url: "https://api.ceiling.wanwukj.cn/Ceiling/user/loadUserInfo.do",
            url: "https://api.ceiling.wanwukj.cn/Ceiling/user/loadUserInfo.do",
            method: 'post',
            data: {
                code: code
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res)
                //--init data
                var data = res.data;
                console.log("getUserSessionKey回调 ： " + data)
                console.log("data中的错误提示" + data.err)
                //调用结果出现错误
                if (data.status == 0) {
                    //错误提示窗
                    wx.showToast({
                        title: data.err,
                        duration: 2000
                    });
                    return false;
                }
                // //将用户会话密匙session_key设置到用户信息中
                // that.globalData.userInfo['sessionId'] = data.session_key;
                // //将用户的唯一标识openid设置到用户信息中
                // that.globalData.userInfo['openid'] = data.openid;
                wx.setStorageSync("open_id", data.openid);
                wx.setStorageSync("session_key", data.session_key);
                console.log("用户信息：" + data.session_key + " , " + data.openid)
                //调用用户登陆函数
                // that.onLoginUser();
            },
            // 接口调用失败的回调函数
            fail: function (e) {
                //错误提示窗
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            },
        });
    },

    //处理用户登陆
    onLoginUser: function () {
        console.log("onLoginUser")
        var that = this;
        //调用后端处理用户登陆接口
        var openid = wx.getStorageSync("open_id");

        wx.request({
            // url: "https://api.ceiling.wanwukj.cn/Ceiling/user/register.do",
            url: "https://api.ceiling.wanwukj.cn/Ceiling/user/register.do",
            method: 'POST',
            data: {
                sessionId: user.sessionId,
                gender: user.gender,
                nickName: user.nickName,
                headUrl: user.avatarUrl,
                openid: openid
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                //--init data        
                var data = res.data.arr;
                var status = res.data.state;
                console.log("success : " + res.data.state);
                that.d.userId = userId;
            },
            fail: function (e) {
                wx.showToast({
                    title: '网络异常！',
                    duration: 2000
                });
            },
        });
    },
    globalData: {
        userInfo: null
    }
});
