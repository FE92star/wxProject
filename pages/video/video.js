// pages/video/video.js
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onLoad:function(){
    
    //获取系统信息。
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.setData({
          scrollHeight:res.windowHeight-240
        })
      }
    })
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
    data: {
      scrollHeight:0,
      video:{
        id:0,
        src: 'http://hardenwang.online/video/01.mp4',
        name:"常规赛十大助攻"
      },
        videoList:[
          {
            id:0,
            src: 'http://hardenwang.online/video/01.mp4',
            poster:'http://hardenwang.online/video/01.jpg',
            name:"常规赛十大助攻",
            title:"库里鬼魅背穿",
            type:"体育"
          },
          {
            id:1,
            src: 'http://hardenwang.online/video/02.mp4',
            poster:'http://hardenwang.online/video/02.jpg',
            name:"常规赛十大扣篮",
            title:"拉文上榜小南斯惊天隔扣"
          },
          {
            id:2,
            src: 'http://hardenwang.online/video/03.mp4',
            poster:'http://hardenwang.online/video/03.jpg',
            name:"哈登常规赛十大过人",
            title:"大胡子化身最强节奏帝"
          },
          {
            id:3,
            src: 'http://hardenwang.online/video/04.mp4',
            poster:'http://hardenwang.online/video/04.jpg',
            name:"库里花式进攻技巧集锦",
            title:"带你领略库里的超强进攻！"
          },
          {
            id:4,
            src: 'http://hardenwang.online/video/05.mp4',
            poster:'http://hardenwang.online/video/05.jpg',
            name:"周杰伦为护歌迷怒吼保安",
            title:"给我滚出去！我在跟你讲话",
            type:"娱乐"
          },
          {
            id:5,
            src: 'http://hardenwang.online/video/06.mp4',
            poster:'http://hardenwang.online/video/06.jpg',
            name:"《人民的名义》唱戏片段曝光",
            title:"祈同伟竟然忘词了"
          },
          {
            id:6,
            src: 'http://hardenwang.online/video/07.mp4',
            poster:'http://hardenwang.online/video/07.jpg',
            name:"《欢乐颂2》杨子闹乌龙",
            title:"关关大长腿逆天"
          }
          ,
          {
            id:7,
            src: 'http://hardenwang.online/video/08.mp4',
            poster:'http://hardenwang.online/video/08.jpg',
            name:"林志玲不认暧昧新欢",
            title:"大赞金城武风采依旧"
          },
          {
            id:8,
            src: 'http://hardenwang.online/video/09.mp4',
            poster:'http://hardenwang.online/video/09.jpg',
            name:"中国首艘国产航母下水",
            title:"延时摄影直击全程",
            type:"新闻"
          },
          {
            id:9,
            src: 'http://hardenwang.online/video/10.mp4',
            poster:'http://hardenwang.online/video/10.jpg',
            name:"云南第一监狱毒贩越狱",
            title:"抢货车冲破监狱隔离网"
          },
          {
            id:10,
            src: 'http://hardenwang.online/video/11.mp4',
            poster:'http://hardenwang.online/video/11.jpg',
            name:"法总统候选人携妻现身",
            title:"竟激动跳到车上拉选票"
          },
          {
            id:11,
            src: 'http://hardenwang.online/video/12.mp4',
            poster:'http://hardenwang.online/video/12.jpg',
            name:"伊万卡大赞父亲特朗普",
            title:"结果惨遭观众嘘到没说话"
          },
          {
            id:12,
            src: 'http://hardenwang.online/video/13.mp4',
            poster:'http://hardenwang.online/video/13.jpg',
            name:"中国人越来越不爱iPhone？",
            title:"苹果大中华区收入跌幅扩大",
            type:"科技"
          },
          {
            id:13,
            src: 'http://hardenwang.online/video/14.mp4',
            poster:'http://hardenwang.online/video/14.jpg',
            name:"科技三分钟",
            title:"iPhone销量低迷怪媒体？"
          },
          {
            id:14,
            src: 'http://hardenwang.online/video/15.mp4',
            poster:'http://hardenwang.online/video/15.jpg',
            name:"六大共享单车接入支付宝",
            title:"扫一扫即可取走，押金全免"
          }
        ],
    
    },
  playVideo:function(event){
    var idx = event.target.dataset.idx;
    console.log(event.target.dataset.idx)
    var that = this;
    that.setData({
      video : this.data.videoList[idx]
    })
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    
  },
  bindFormSubmit: function(event) {
    var that = this;   
    this.videoContext.sendDanmu({
      text: event.detail.value.text,
      color: getRandomColor()
    })
    console.log(event.detail.value.text)
  }
})