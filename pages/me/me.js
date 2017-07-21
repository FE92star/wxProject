// pages/mine/mine.js
var app = getApp()
Page({
  data:{
    hidden:true,
    switch:true,
    userInfo:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    
  },
  onReady:function(){
    // 页面渲染完成
    
  },
 getInfo:function(){
   var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        switch:false
      })
    });

 },
 clearInfo:function(){
    wx.clearStorageSync();
    this.setData({
      switch:true
    })
    
 },

  
})

