const express = require('express')
const app = express()
const request = require('request')
const multer = require('multer')
const storage = multer.memoryStorage()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const Utils = require('./utils')
const qn = require('./qn')
const Conf = require('./conf.js')

app.use(bodyParser.json())
app.use(express.static('movieServer/dist'))
app.use(multer({ storage: storage}).single('file'))
app.use(cookieParser())
app.use(session({
  secret: 'guessmovie',
  cookie: {maxAge: 36000000},
  resave: false,
  saveUninitialized: true
}))

const apiUrl = 'https://api.bmob.cn/1/classes/'
const apiUser = 'https://api.bmob.cn/1/'
const headerText = Conf.bmob

// 显示错误信息
function showError (error, body) {
	if (error) {
		console.log(`basic error：${error}`)
		return true
	}
	if (body && body.error) {
		console.log(`bmob  error: ${body.error}`)
		return true
	}
}

// 判断用户的登录状态
function loginStatus (req) {
	if (req.session.obid) {
		return (req.session)
	} else {
		return false
	}
}

// 处理ajax请求
function restful (res, url) {
	const methType = arguments[2]
	const body = arguments[3]
	let options = {
		method: methType || 'GET',
	  url: apiUrl + url,
	  headers: headerText,
	  json: true
	}
	if (body) {
		options.body = body
	}
	request(options, function (error, response, data) {
		if (showError(error, data)) return
	  res.end(JSON.stringify(data))
	})
}

// 处理 新增电影请求
function upMovie (req, res, url, body) {
	const options = {
		method: 'POST',
	  url: apiUrl + url,
	  headers: headerText,
	  body: body.movie,
	  json: true
	}
	// 如用户为登录状态，则加入用户信息
	let user = {__type:"Pointer",className:"_User",objectId:''}
	const status = loginStatus(req)
	if (status) {
		user.objectId = status.obid
	}
	request(options, function (error, response, data) {
	  if (showError(error, data)) return
	  const picBody = {movie:{__type:"Pointer",className:"movie",objectId:data.objectId},user:user,images:body.picture,rating:{average:0,stars:0,total:0},status:2}
	  restful (res, 'picture', 'POST', picBody)
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

// 豆瓣搜索结果api
function searchMovie (res, keyword) {
	request('https://movie.douban.com/j/subject_suggest?q=' + keyword, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
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
	const uri = encodeURI(`?where={"id":"'${req.query.id}'"}`)
	restful (res, 'movie' + uri)
})

// 新增电影
app.post('/addMovie', function (req, res) {
	upMovie(req, res, 'movie', req.body)
})

// 新增剧照
app.post('/addPicture', function (req, res) {
	let body = req.body
	const status = loginStatus(req)
	if (status) {
		body.user = {__type:"Pointer",className:"_User",objectId:status.obid}
	}
	restful (res, 'picture', 'POST', req.body)
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
	const arrId = req.params.objid.split(',')
	for (let i in arrId) {
		restful (res, 'movie/' + arrId[i], 'PUT', {status: 1})
	}
})

// 查询剧照总数
app.get('/getCount', function (req, res) {
	console.log(`登录状态：${req.session.obid ? req.session.obid : '未登录'}`)
	restful (res, 'picture?where=%7B%22status%22:0%7D&limit=0&count=1')
})

// 查询剧照列表
app.get('/picture', function (req, res) {
	if (req.query.user) {
		restful (res, `picture?where=%7B%22user%22:%22${req.query.user}%22%7D&limit=15&count=1&skip=${req.query.page}`)
	} else {
		restful (res, `picture?where=%7B%22status%22:${req.query.status}%7D&limit=15&count=1&skip=${req.query.page}`)
	}
})

// 查询指定id剧照
app.get('/picture/:objid', function (req, res) {
	restful (res, `picture/${req.params.objid}?include=movie`)
})

// 随机返回一条剧照
app.get('/rd-pic', function (req, res) {
	const rdNum = req.query.rdNum
	restful (res, 'picture?where=%7B%22status%22:0%7D&include=movie&limit=1&skip=' + rdNum)
})

// 删除&审核剧照
app.get('/delPicture/:objid', function (req, res) {
	const status = Number(req.query.status)
	const arrId = req.params.objid.split(',')
	for (let i in arrId) {
		restful (res, 'picture/' + arrId[i], 'PUT', {status: status})
	}
})

// 喜欢
app.get('/like/:objid', function (req, res) {
	const like = req.query.bol ? 'like' : 'unlike'
	restful (res, 'picture/' + req.params.objid, 'PUT', {like:{'__op':'Increment','amount':1}})
})

// 本地图片上传
app.post('/upimg', function (req, res) {
  const upBuffer = req.file.buffer
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
	const objectId = req.query.objectId
	const options = {
		method: 'GET',
	  url: `${apiUrl}errors/?where=%7B%22movie%22:%22${objectId}%22%7D`,
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (showError(error, body)) return
	 	const result = JSON.parse(body).results
	  // 判断数据是否存在，有则更新，没有则新增
	  if (result.length) {
			restful (res, 'errors/' + result[0].objectId, 'PUT', {count:{__op:'Increment',amount:1}})
	  } else {
	  	restful (res, 'errors/', 'POST', {picture:{__type:"Pointer",className:"picture",objectId:objectId},count:{__op:'Increment',amount:1}})
	  }
	})
})

// 给剧照评难度
app.get('/rate/:objid', function (req, res) {
	const rating = req.query.rating
	const options = {
		method: 'GET',
	  url: `${apiUrl}picture/${req.params.objid}?keys=rating`,
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (showError(error, body)) return
	 	const objRat = JSON.parse(body).rating
	  const result = new Utils.rating(objRat, rating)
	  restful (res, 'picture/' + req.params.objid, 'PUT', {rating:result})
	})
})

// 登录
app.post('/signin', function (req, res) {
	const options = {
		method: 'GET',
	  url: `${apiUser}login/?username=${req.body.username}&password=${req.body.password}`,
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (showError(error, body)) return
	  const data = JSON.parse(body)
		if (!JSON.parse(body).error) {
			// 将objectId存入session
			req.session.name = data.username
			req.session.obid = data.objectId
			req.session.token = data.sessionToken
			console.log(req.session)
		}
		res.end(body)
	})
})

// 注册
app.post('/register', function (req, res) {
	const options = {
		method: 'POST',
	  url: apiUser + 'users',
	  headers: headerText,
	  body: req.body,
	  json: true
	}
	request(options, function (error, response, body) {
	  if (showError(error, body)) return
		if (!body) {
			console.log(req.session)
		}
	  res.end(JSON.stringify(body))
	})
})

// 查询登录状态
app.get('/loginstatus', function (req, res) {
	const data = JSON.stringify(loginStatus(req))
	res.end(data)
})

// 查询用户信息
app.get('/getuser', function (req, res) {
	const options = {
		method: 'GET',
	  url: `${apiUser}users/${req.query.id}`,
	  headers: headerText
	}
	request(options, function (error, response, body) {
	  if (showError(error, body)) return
		res.end(body)
	})
})

// 退出登录
app.get('/quit', function (req, res) {
	req.session.destroy(function (err) {
		if (showError(error)) return
		const data = JSON.stringify('success')
		res.end(data)
	})
})

//记录游戏数据
app.get('/gamelog/:objid', function (req, res) {
	let data = {}
	let headerText2 = {}
	if (req.query.result === 'right') {
		data = {right:{'__op':'Increment','amount':1}}
	} else {
		data = {wrong:{'__op':'Increment','amount':1}}
	}
	headerText2['x-bmob-rest-api-key'] = headerText['x-bmob-rest-api-key']
	headerText2['x-bmob-application-id'] = headerText['x-bmob-application-id']
	headerText2['content-type'] = 'application/json'
	headerText2['x-bmob-session-token'] = req.session.token
	const options = {
		method: 'PUT',
	  url: `${apiUser}users/${req.params.objid}`,
	  headers: headerText2,
	  body: data,
	  json: true
	}
	request(options, function (error, response, body) {
	  if (showError(error, body)) return
	 	res.end(JSON.stringify(body))
	})
})

// 映射到首页
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html" )
})

module.exports = app
