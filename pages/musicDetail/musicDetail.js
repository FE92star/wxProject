// pages/musicDetail/musicDetail.js
function parseLyric(lrc) {
	    var lyrics = lrc.split("\n");
	    var lrcObj = {};
	    for(var i=0;i<lyrics.length;i++){
	        var lyric = decodeURIComponent(lyrics[i]);
	        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
	        var timeRegExpArr = lyric.match(timeReg);
	        if(!timeRegExpArr)continue;
	        var clause = lyric.replace(timeReg,'');
	        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
	            var t = timeRegExpArr[k];
	            var min = Number(String(t.match(/\[\d*/i)).slice(1)), sec = Number(String(t.match(/\:\d*/i)).slice(1));
	            var time = min * 60 + sec;
	            lrcObj[time] = clause;
	        }
	    }
	    return lrcObj;
	}

var musicLrc = {};
   
Page({
   canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onLoad:function(options){
    var that = this;
    var id=options.id;
    console.log(id);
    /*if(!id.indexOf('hot')){
      id = parseInt(id.substring(3));
      wx.request({
        url:'http://www.wanglei222.online/connect/music.php',
        dataType:'json',
        success:function(res){
            that.setData({
              musicList:res.data
            })
            var aim = that.data.musicList[id];
            var aimlrc = that.data.musicList[id].lrc;
            that.setData({
              id:id,
              playing:aim,
              lrc:aimlrc
            })
            console.log(that.data.playing);
        }
      });    
    }else{*/
      if(id.length>=4){
          wx.request({
           url:`http://tingapi.ting.baidu.com/v1/restserver/ting?
format=json&calback=&from=webapp_music&method=baidu.ting.song.play&songid=${id}`,
            dataType:'json',
            success:function(res){
              console.log(res.data);
              that.setData({
                switch:false,
                songInfo:res.data.songinfo,
                bitrate:res.data.bitrate
              })
            }
          })
      }else{
          var aim=this.data.musicList[id];
          var aimlrc = this.data.musicList[id].lrc;
          this.setData({
            id:id,
            playing:aim,
            lrc:aimlrc
          });
      }    
    //}
    
    
    // 页面初始化 options为页面跳转所带来的参数;
    var res = wx.getSystemInfoSync();
    this.setData({
      deviceWidth:res.windowWidth,
      deviceHeight:res.windowHeight
    });    
  },
   onReady:function(){
     var that=this;
     setTimeout(function(){
       that.audioCtx.play()
     },500); 
     musicLrc = parseLyric(this.data.lrc);
     console.log(musicLrc)
     this.audioCtx = wx.createAudioContext('myAudio')
    // 页面渲染完成 
    
      this.context = wx.createCanvasContext('firstCanvas');    
      this.context.setLineWidth(10);
  },
  data: {
     dur:0,
     cur:0,
     ani:{},
     switch1:true,
     switch:true,
     songInfo:{},
     bitrate:{},
     lrc:``,
     musicText:'',
     deviceWidth:0,
     deviceHeight:0,
     percent:0,
     id:0,
     playing:{},
    musicList:[]
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause();
  },
  audio14: function () {
    this.audioCtx.seek(180)
    console.log('stop');
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },

  listen:function(event){
    var switc = this.data.switch1;
    var currentTime = event.detail.currentTime;
    var second = parseInt(currentTime);
    var duration = event.detail.duration;
    var per= (currentTime/duration).toFixed(4);
    this.setData({
      dur:duration,
      cur:currentTime,
      percent:per*100,
      musicText:musicLrc[second]
    });
    
    
    var width = this.data.deviceWidth*0.4;
    var dia = this.data.deviceWidth*0.267;
    this.context.setStrokeStyle("#ffcd2d")
    this.context.arc(width, width, dia,0,per*2*Math.PI, false);
      
    this.context.stroke();
    this.context.draw();
    this.animation(switc);
    console.log(switc);
    
  },
  nextSong:function(){
    var that = this;
    var pos = 0
    console.log(that.data.id,that.data.musicList.length);
    if(that.data.id+1>=that.data.musicList.length){
      pos = 0;
      that.setData({
        id:pos
      })
    }else{
      pos = that.data.id+1;
      that.setData({
        id:pos
      })
    }
    var playMusic = that.data.musicList[pos];
    console.log(that.data.musicList[pos])
    lrc = parseLyric(this.data.lrc);
    that.setData({
      playing:playMusic,
      lrc:playMusic.lrc
    });
    
    setTimeout(function(){
      that.audioCtx.play();
    },500)
  },
   preSong:function(){
    var that = this;
    var pos = 0;
    if(that.data.id<=0){
      pos = that.data.musicList.length-1;
      that.setData({
        id:pos
      })
    }else{
      pos = that.data.id-1;
      that.setData({
        id:pos
      })
    }
    var playMusic = that.data.musicList[pos];
    lrc = parseLyric(this.data.lrc);
    that.setData({
      playing:playMusic,
      lrc:playMusic.lrc
    });
    setTimeout(function(){
      that.audioCtx.play()
    },500)
  },
  animation:function(boo){
    var time = this.data.dur;
    var t2 = this.data.cur;
    var animation = wx.createAnimation({
        duration:time*1000,
     });
     boo?animation.rotate(360*time/60).step():animation.rotate(360*t2/60).step();
     this.setData({
        ani:animation.export()
     })
  },
  change:function(){
    var parse = this.data.switch1;
    this.setData({
      switch1:!parse
    })
    parse?this.audioPause():this.audioPlay();
    
  }
})