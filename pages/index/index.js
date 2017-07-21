//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    hidden:true,
    imgUrls: [
      'http://img4.imgtn.bdimg.com/it/u=2194488862,2758818040&fm=23&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=214320403,3896225246&fm=23&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=3183625929,3631525678&fm=23&gp=0.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    motto: 'Welcome To My Home',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    try {
      var res = wx.getSystemInfoSync()
      console.log(res)
    } catch (e) {
      // Do something when catch error
    }
  },
  getMap:function(){
    var that = this;
    that.setData({
        hidden:false
    })
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
    that.setData({
        hidden:true
    })
  }
})
