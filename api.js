var express = require('express')
var app = express()
var request = require('request')
var multer = require('multer')
var storage = multer.memoryStorage()
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var Until = require('./until')
var qn = require('./qn')
var qiniu = require("qiniu")

app.use(bodyParser.json())
app.use(express.static('dist'))
app.use(multer({ storage: storage}).single('file'))
app.use(cookieParser())
app.use(session({
  secret: 'guessmovie',
  cookie: {maxAge: 3600000},
  resave: false,
  saveUninitialized: true
}))

var apiUrl = 'https://api.bmob.cn/1/classes/'
var apiUser = 'https://api.bmob.cn/1/'
var headerText = {
  'content-type': 'application/json',
  'x-bmob-rest-api-key': '8a3d04621f341624f41a5db35d688abd',
  'x-bmob-application-id': '897d8343de907640340fa6b06684b181'
}

// 处理 GET 请求
function restful (res, url) {
	var options = {
		method: 'GET',
	  url: apiUrl + url,
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (error) throw new Error(error)
	  res.end(body)
	})
}

// 处理 PUT 或 POST 请求
function restful2 (res, url, methType, body) {
	var options = { 
		method: methType,
	  url: apiUrl + url,
	  headers: headerText,
	  body: body,
	  json: true 
	}
	request(options, function (error, response, body) {
	  if (error) throw new Error(error)	  
	  res.end(JSON.stringify(body))
	})
}

// 处理用户表
function users (res, req, url) {
	var options = {
		method: 'GET',
	  url: apiUser + url,
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (error) throw new Error(error)
	  var data = JSON.parse(body)
		if (!JSON.parse(body).error) {
			// 将objectId存入session	
			req.session.name = data.objectId			
			console.log(req.session)
		}
		res.end(body)
	})
}

// 处理 新增电影请求
function upMovie (req, res, url, body) {
	var options = { 
		method: 'POST',
	  url: apiUrl + url,
	  headers: headerText,
	  body: body.movie,
	  json: true 
	}
	// 如用户为登录状态，则加入用户信息
	var user = {}
	var status = loginStatus(req)
	if (status) {
		user = {__type:"Pointer",className:"_User",objectId:status}
	}	
	// console.log(body.movie)
	request(options, function (error, response, body2) {
	  if (error) throw new Error(error)
	  var picBody = {movie:{__type:"Pointer",className:"movie",objectId:body2.objectId},user:user,images:body.picture,rating:{average:0,stars:0,total:0},status:2}
		console.log(JSON.stringify(picBody))
	  restful2 (res, 'picture', 'POST', picBody)
	})
}

// 豆瓣电影api
function getMovie (res, id) {
	request('http://api.douban.com/v2/movie/subject/' + id, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.end(body)
	  }
	})
}

// 判断用户的登录状态
function loginStatus (req) {
	if (req.session.name) {
		return (req.session.name)
	} else {
		return false
	}
}

// 豆瓣搜索结果api
function searchMovie (res, keyword) {
	request('https://movie.douban.com/j/subject_suggest?q=' + keyword, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body)
	    res.end(body)
	  }
	})
}

//设置跨域访问
app.all('*', function(req, res, next) {
		res.header('content-type', 'application/json;charset=utf-8')
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// 上传
// 查询数据库是否已包含该电影
app.get('/exist', function (req, res) {
	var uri = encodeURI('?where={"id":"'+req.query.id+'"}')
	// console.log('uri:' + uri)
	restful (res, 'movie' + uri)
})

// 新增电影
app.post('/addMovie', function (req, res) {
	upMovie(req, res, 'movie', req.body)
})

// 新增剧照
app.post('/addPicture', function (req, res) {
	// console.log(req.body)
	var body = req.body
	var status = loginStatus(req)
	if (status) {
		body.user = {__type:"Pointer",className:"_User",objectId:status}
	}	
	restful2 (res, 'picture', 'POST', req.body)
})

// 查询电影列表
app.get('/movie', function (req, res) {
	restful (res, 'movie?where=%7B%22status%22:0%7D&limit=15&count=1&skip=' + req.query.page)
})

// 查询指定id电影
app.get('/movie/:objid', function (req, res) {
	restful (res, 'movie/' + req.params.objid)
})

// 删除电影
app.get('/delMovie/:objid', function (req, res) {
	var arrId = req.params.objid.split(',')
	for (var i in arrId) {
		restful2 (res, 'movie/' + arrId[i], 'PUT', {status: 1})
	}
})

// 查询剧照总数
app.get('/getCount', function (req, res) {
	console.log(req.session.name)
	restful (res, 'picture?where=%7B%22status%22:0%7D&limit=0&count=1')
})

// 查询剧照列表
app.get('/picture', function (req, res) {
	// console.log(req.query.page)
	restful (res, 'picture?where=%7B%22status%22:'+req.query.status+'%7D&limit=15&count=1&skip=' + req.query.page)
})

// 查询指定id剧照
app.get('/picture/:objid', function (req, res) {
	restful (res, 'picture/' + req.params.objid + '?include=movie')
})

// 随机返回一条剧照
randomNum = new Until.randomNum()
app.get('/rd-pic', function (req, res) {
	var count = req.query.count
	var rdNum
	if (count !== 'undefined') {	
		rdNum = randomNum.init(count)
		// console.log('初始化：' + rdNum + '\n')
	} else {
		rdNum = randomNum.sendNum()
		// console.log('下一题：' + rdNum + '\n')
	}
	restful (res, 'picture?where=%7B%22status%22:0%7D&include=movie&limit=1&skip=' + rdNum)
})

// 删除&审核剧照
app.get('/delPicture/:objid', function (req, res) {
	// console.log(req.query.status)
	var status = Number(req.query.status)
	var arrId = req.params.objid.split(',')
	for (var i in arrId) {
		restful2 (res, 'picture/' + arrId[i], 'PUT', {status: status})
	}
})

// 喜欢
app.get('/like/:objid', function (req, res) {
	var like = req.query.bol ? 'like' : 'unlike'
	restful2 (res, 'picture/' + req.params.objid, 'PUT', {like:{'__op':'Increment','amount':1}})
})

// 本地图片上传
app.post('/upimg', function (req, res) {
  var upBuffer = req.file.buffer
  new qn.uploadFile(res, upBuffer)
})

// 在线图片上传
app.get('/upimgUrl', function (req, res) {
	new qn.fetch(res, req.query.pic)
})

// 搜索电影名称
app.get('/search', function (req, res) {
	searchMovie(res, encodeURI(req.query.keyword))
})

// 获取电影信息
app.get('/getFilm', function (req, res) {
	getMovie(res, req.query.id)
})

// 处理bug反馈
app.get('/addErrors', function (req, res) {
	var objectId = req.query.objectId
	var options = {
		method: 'GET',
	  url: apiUrl + 'errors/?where=%7B%22movie%22:%22'+objectId+'%22%7D',
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (error) throw new Error(error)
	 	var result = JSON.parse(body).results
	  // 判断数据是否存在，有则更新，没有则新增
	  if (result.length) {
			restful2 (res, 'errors/'+result[0].objectId, 'PUT', {count:{__op:'Increment',amount:1}})
	  } else {
	  	restful2 (res, 'errors/', 'POST', {picture:{__type:"Pointer",className:"picture",objectId:objectId},count:{__op:'Increment',amount:1}})
	  }
	})
})

// 给剧照评难度
app.get('/rate/:objid', function (req, res) {
	var rating = req.query.rating
	var options = {
		method: 'GET',
	  url: apiUrl + 'picture/'+req.params.objid+'?keys=rating',
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (error) throw new Error(error)
	 	var objRat = JSON.parse(body).rating
	  var result = new Until.rating(objRat, rating)
	  restful2 (res, 'picture/'+req.params.objid, 'PUT', {rating:result})
	})
})

// 验证登录
app.post('/signin', function (req, res) {
	console.log(req.body.username)
	users (res, req, `login/?username=${req.body.username}&password=${req.body.password}`)
})

// 查询登录状态
app.get('/loginstatus', function (req, res) {
	var data = JSON.stringify(loginStatus(req))
	res.end(data)
})

// 映射到首页
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})


var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})