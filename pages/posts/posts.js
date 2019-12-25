
var postsData=require("../../data/posts_content.js")
// 
// pages/posts/posts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"Nov 19 2019"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载数据
    let posts_data = postsData.postList;
    let banner_data = postsData.bannerList;
    this.setData({ posts_data: posts_data,banners_data:banner_data});
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

  //新闻点击事件
  onPostClick:function(event){
    var post_id = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post_detail/post_detail?id='+post_id
    })
  },
  //banner点击事件
  onBannerClick:function(event){
    var post_id = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post_detail/post_detail?id=' + post_id
    })
  }
})