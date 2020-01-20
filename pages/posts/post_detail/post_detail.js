var postsData = require("../../../data/posts_content.js");
var app=getApp();

// pages/posts/post_detail/post_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var post_id=options.id
    this.data.postid = post_id;
    this.setData({ post_data: postsData.postList[this.data.postid]})
    var posts_collection = wx.getStorageSync("posts_collection");
    var collected = posts_collection[this.data.postid] ? posts_collection[this.data.postid]:false;
    this.setData({ postcollected: collected });

    //设置音乐播放按钮状态
    var isMusicPlaying = app.gloablData.g_isMusicPlaying;
    var currentMusicPostId = app.gloablData.g_currentMusicPostId;
    if (isMusicPlaying && currentMusicPostId == this.data.postid){
      this.setData({
        isMusicPlaying: isMusicPlaying
      })
    }
      

    //设置监听
    var that=this;
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isMusicPlaying:true
      });
      app.gloablData.g_isMusicPlaying=true;
      app.gloablData.g_currentMusicPostId = that.data.postid;
    });

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isMusicPlaying: false
      });
      app.gloablData.g_isMusicPlaying = false;
      app.gloablData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isMusicPlaying: false
      });
      app.gloablData.g_isMusicPlaying = false;
      app.gloablData.g_currentMusicPostId = null;
    });



    
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

  },
  //收藏按钮响应
  onPostCollection:function(event){
    var posts_collection=wx.getStorageSync("posts_collection");
    if (posts_collection) {//有缓存情况
      var collected=posts_collection[this.data.postid];
      if(collected!=undefined){
        collected=!collected;
        posts_collection[this.data.postid]=collected;       
      }else{ //页面没缓存情况，肯定没有收藏
        posts_collection[this.data.postid]=true;        
      }

    } else {//没有缓存情况，必定是没有收藏，
      posts_collection = {};
      posts_collection[this.data.postid] = true;
    }
    this.showModal(posts_collection);
  },
  //是否收藏
  showToast:function(postsCollection){
    wx.setStorage({
      key: 'posts_collection',
      data: postsCollection,
    });
    this.setData({ postcollected: postsCollection[this.data.postid] });
    wx.showToast({
      title: postsCollection[this.data.postid] ? '收藏成功' : "取消成功",
    })
  },
   //是否收藏
  showModal: function (postsCollection){
    var that=this;
    wx.showModal({
      title: "收藏",
      content: postsCollection[this.data.postid] ? "收藏该文章？" : "取消收藏该文章？",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success:function(res){
        if(res.confirm){
          wx.setStorage({
            key: 'posts_collection',
            data: postsCollection,
          });
          that.setData({ postcollected: postsCollection[that.data.postid] });
        }else{
          postsCollection[that.data.postid] = !postsCollection[that.data.postid]
        }

      }
    })

  },
  //分享按钮响应
  onShareTap:function(event){
    var items=[
      "分享到朋友圈",
      "分享到微博",
      "分享给好友"
    ]
    wx.showActionSheet({
      itemList: items,
      itemColor:"#405f80",
      success:function(res){
        wx.showModal({
          title: '用户'+items[res.tapIndex],
          content: '用户是否取消'+res.showCancel,
        })
      }
    })
  },
  //音乐按钮相应
  onMusicTap:function(event){
    var isMusicPlaying=this.data.isMusicPlaying;
    var postdata = this.data.post_data;
    if (isMusicPlaying){
      wx.pauseBackgroundAudio();
      this.setData({isMusicPlaying:false});
      app.gloablData.g_isMusicPlaying = false;
      app.gloablData.g_currentMusicPostId = null;
    }else{
      wx.playBackgroundAudio({
        dataUrl: postdata.music.url,
        title:postdata.music.title,
        coverImgUrl:postdata.music.coverImgUrl
      });
      this.setData({isMusicPlaying:true});
      app.gloablData.g_isMusicPlaying = true;
      app.gloablData.g_currentMusicPostId = this.data.postid;
    }
  }
})