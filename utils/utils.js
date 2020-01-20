function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}
//获取电影数据
function getMovieData(url, callback) {
  wx.request({
    url: url,
    method: "GET",
    data: {},
    header: {
      "Content-Type": "json"
    },
    success(res) {
      // console.log(res);
      if (res.statusCode == 200) {
        var movies = res.data;
        // that.processMoviesData(movies);
        callback(movies);
      }
    }
  })
}
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx] + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}
function dealactor(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    var infor = casts[idx];
    var chineseName=infor.split(" ")[0];
    castsjoin = castsjoin + chineseName + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}


module.exports = {
  convertToStarsArray: convertToStarsArray,
  getMovieData: getMovieData,
  convertToCastInfos: convertToCastInfos,
  convertToCastString: convertToCastString,
  dealactor: dealactor
}