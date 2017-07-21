// pages/movie/movie.js

Page({
  
  data:{
    scrollHeight:0,
    start:4,
    remind:'',
    hidden:true,
    movieList:[],
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight:res.windowHeight - 50
        })
      }
    })
    that.setData({
      hidden:false
    })
    wx.request({
      url:`https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=4`,
      success:function(res){
         that.setData({
           hidden:true,
           movieList:res.data.data.movies
         })
      }
    })
  },
  refresh:function(){
    var that = this;
    that.setData({
      hidden:false,
      movieList:[]
    })
    wx.request({
      url:`https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=4`,
      success:function(res){
         that.setData({
           hidden:true,
           movieList:res.data.data.movies
         })
      }
    })
  },
  loadMore:function(){
    var that = this;
    var j = this.data.start;
    if(this.data.remind!==''){
       this.setData({
          hidden:false,
          start:j+2
        });
    }else{
       this.setData({
        hidden:false,
        start:j+2
      });
    }
    
    
   
    j = this.data.start;
     wx.request({
      url:`https://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=${j}`,
      success:function(res){
        if(res.data.data.movies.length<=j){
          that.setData({
           
          })
        }
         that.setData({
           hidden:true,         
           movieList:res.data.data.movies
         })
      }
    })
  },
  bindViewTap: function() {
    
  },
  showDetail:function(event){
    var id = event.target.dataset.id;
    console.log(event.target.dataset)
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + id
    })
  },
  scroll:function(event){
    var that = this;
    that.setData({
      scrollTop:event.detail.scrollTop
    })
  },
  top:function(event){
    console.log(event.detail.y)
    this.setData({
      scrollTop: 0
    })
  }
})