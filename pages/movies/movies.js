// pages/movies/movies.js
var util = require('../../utils/utils.js');
var url = 'http://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comingSoon:{},
    inTheaters:{},
    top250:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var inTheatersUrl = app.gloablData.douban_baseurl + "/v2/movie/in_theaters" + "?apikey=" + app.gloablData.appkey+"&start=0&count=3";
    var comingSoonurl = app.gloablData.douban_baseurl + "/v2/movie/coming_soon" + "?apikey=" + app.gloablData.appkey + "&start=0&count=3";
    var top250Url = app.gloablData.douban_baseurl + "/v2/movie/top250" + "?apikey=" + app.gloablData.appkey + "&start=0&count=3";
    
    this.getMovieData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieData(comingSoonurl,"comingSoon","马上上映");
    this.getMovieData(top250Url,"top250","经典老片");
  },
  getMovieData: function(url,settedKey,settedCategory) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      data: {},
      header: {
        "Content-Type": "json"
      },
      success(res) {
        console.log(res);
        if (res.statusCode == 200) {
          var movies = res.data.subjects;
          that.processMoviesData(movies, settedKey,settedCategory);
        }
      }
    })
  },
  //处理电影数据
  processMoviesData(movies,settedKey,settedCategory){
    var temp=[];
    for(var i=0;i<movies.length;i++){
      var title=movies[i].title;
      if(title.length>6){
        title = title.substring(0,6)+"...";
      }
      var id=movies[i].id;
      var image=movies[i].images.medium;
      var average=movies[i].rating.average;
      var stars = util.convertToStarsArray(movies[i].rating.stars);
      temp.push({
        "id":id,
        "image":image,
        "average":average,
        "stars":stars
      })
    }
    var movies={};
    movies[settedKey]={"movies":temp,"category":settedCategory};
    this.setData(movies)
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