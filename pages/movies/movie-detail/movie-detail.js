// pages/movies/movie-detail/movie-detail.js
var util = require('../../../utils/utils.js');
var app = getApp();
var detailUrl = app.gloablData.douban_baseurl + "/v2/movie/{id}" + "?apikey=" + app.gloablData.appkey;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    var id = options.id;
    var request = app.gloablData.douban_baseurl + "/v2/movie/" + id + "?apikey=" + app.gloablData.appkey;
    console.log(request);
    util.getMovieData(request, that.processDoubanData);
  },
  processMovieData: function(data) {
    console.log(data);
  },
  processDoubanData(data) {
    console.log(data);
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.author[0] != null) {
      if (data.author[0].avatars != null) {
        director.avatar = data.author[0].avatars.large

      }
      director.name = data.author[0].name;
      director.id = data.author[0].id;
    }
    var movie = {
      movieImg: data.image ? data.image : "",
      country: data.attrs.country[0],
      title: data.title,
      originalTitle: data.alt_title,
      wishCount: 9999,
      commentCount: 5000,
      year: data.attrs.year[0],
      generes: util.convertToCastString(data.attrs.movie_type),
      stars: util.convertToStarsArray(5),
      score: data.rating.average,
      director: director,
      casts: util.dealactor(data.attrs.cast),
      castsInfo: "",
      summary: data.summary
    };
    this.setData({ movie: movie});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})