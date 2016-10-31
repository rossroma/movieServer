var express = require('express');
var app = express();
var request = require("request");


function getMovie (res, url) {
	request('http://api.douban.com/v2/movie/subject/' + url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.end(body)
	  }
	})
}

function searchMovie (res, keyword) {
	request('https://movie.douban.com/j/subject_suggest?q=' + keyword, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body)
	    res.end(body)
	  }
	})
}

app.all('*', function (req, res, next) {
	res.header('content-type', 'application/json;charset=utf-8')
	next()
})

app.get('/db-movie/:movieid', function (req, res) {
	getMovie(res, req.params.movieid)
})

app.get('/db-search', function (req, res) {
	var keyword = encodeURI(req.query.q)
	searchMovie(res, keyword)
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})