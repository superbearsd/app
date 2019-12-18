var postsData = require("../../../data/posts_content.js")

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
    this.setData({ collected: collected });

    
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
  onPostCollection:function(event){
    var posts_collection=wx.getStorageSync("posts_collection");
    if (posts_collection) {//有缓存情况
      var collected=posts_collection[this.data.postid];
      if(collected!=undefined){
        collected=!collected;
        posts_collection[this.data.postid]=collected;       
      }else{ //页面没缓存情况，肯定没有收藏
        posts_collection[this.data.postid]=true;
        collected=true;        
      }
      wx.setStorage({
        key: 'posts_collection',
        data: posts_collection,
      });
      this.setData({ collected: collected });

    } else {//没有缓存情况，必定是没有收藏，
      posts_collection = {};
      posts_collection[this.data.postid] = true;
      wx.setStorage({
        key: 'posts_collection',
        data: posts_collection,
      });
      this.setData({collected:true});

    

    }
    wx.showToast({
      title: posts_collection[this.data.postid]? '收藏成功':"取消成功",
    })
  }
})