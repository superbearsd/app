// pages/movies/movie-more/movie-more.js
var util = require('../../../utils/utils.js');
var app = getApp();
var inTheatersUrl = app.gloablData.douban_baseurl + "/v2/movie/in_theaters" + "?apikey=" + app.gloablData.appkey + "&count=20&start=";
var comingSoonurl = app.gloablData.douban_baseurl + "/v2/movie/coming_soon" + "?apikey=" + app.gloablData.appkey + "&count=20&start=";
var top250Url = app.gloablData.douban_baseurl + "/v2/movie/top250" + "?apikey=" + app.gloablData.appkey + "&count=20&start=";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    moviescount: 0,
    movies: [],
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var catelog = options.catelog;
    this.data.navigateTitle = catelog;
    switch (catelog) {
      case "马上上映":
        util.getMovieData(comingSoonurl+this.data.moviescount, this.processMoviesData);
        this.data.requestUrl = comingSoonurl;
        break;
      case "经典老片":
        util.getMovieData(top250Url + this.data.moviescount, this.processMoviesData);
        this.data.requestUrl = top250Url;
        break;
      case "正在热映":
        util.getMovieData(inTheatersUrl + this.data.moviescount, this.processMoviesData);
        this.data.requestUrl = inTheatersUrl;
        break;
    }

  },
  //处理电影数据
  processMoviesData(movies) {
    var movies = movies.subjects;
    this.setData({loading:false})
    var temp = [];
    for (var i = 0; i < movies.length; i++) {
      var title = movies[i].title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var id = movies[i].id;
      var image = movies[i].images.medium;
      var average = movies[i].rating.average;
      var stars = util.convertToStarsArray(movies[i].rating.stars);
      temp.push({
        "id": id,
        "image": image,
        "average": average,
        "title": title,
        "stars": stars
      })
    }
    this.setData({moviescount:this.data.moviescount+temp.length})
    this.setData({
      movies: this.data.movies.concat(temp)
    });
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })

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

  },
  //加载新数据
  scrollTolower: function() {
    util.getMovieData(this.data.requestUrl + this.data.moviescount, this.processMoviesData);
    wx.showNavigationBarLoading();
  },
  //加载新数据
  onReachBottom: function () {
    util.getMovieData(this.data.requestUrl + this.data.moviescount, this.processMoviesData);
    wx.showNavigationBarLoading();
  },
  //下拉刷新
  onPullDownRefresh:function(){
    this.data.movies=[];
    this.data.moviescount=0;
    util.getMovieData(this.data.requestUrl + "0", this.processMoviesData);
  },
  //点击详情事件
  onDetailTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../movie-detail/movie-detail?id=" + id,
    })
  }

})