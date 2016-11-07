var qiniu = require("qiniu")
var request = require('request')

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'kfqZfOlTwhys5WVJxQo4SkRey0IFSsNgYRzaoLEt'
qiniu.conf.SECRET_KEY = 'a_bOV7yWMKb9ooJj9MARRIhR5WlnLPkVU-NXk-AN'

//要上传的空间
bucket = 'ross'

// 生成图片名称
function upkey () {
	var d = new Date()
	return 'gm-'+d.getTime()+'.jpg'
}

// 七牛图片域名
var qn_url = 'http://ofnd4wjbn.bkt.clouddn.com/'

//在线上传
exports.fetch = function(res, picUrl) {
	var key = upkey()
	// EncodedEntryURI
	var entry = bucket+":"+key
	var encodedEntryURI = qiniu.util.urlsafeBase64Encode(entry)

	// EncodedURL
	var pic = new Buffer(picUrl).toString('base64')
	var basePic = qiniu.util.base64ToUrlSafe(pic)

	// AccessToken
	var url = 'http://iovip.qbox.me/fetch/'+basePic+'/to/'+encodedEntryURI
	AccessToken = qiniu.util.generateAccessToken(url)
	var options = {
		method: 'POST',
	  url: url,
	  headers:{
	    'authorization': AccessToken,
	    'content-type': 'application/x-www-form-urlencoded'
	  }
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		var picInfo = {
			path: qn_url,
			name: JSON.parse(body).key
		}
		res.end(JSON.stringify(picInfo))
	})
}

//本地上传
exports.uploadFile = function(res, buffer) {
	var key = upkey()

	//构建上传策略函数
	function uptoken(bucket, key) {
	  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key)
	  return putPolicy.token()
	}
	//生成上传 Token
	token = uptoken(bucket, key)

  var extra = new qiniu.io.PutExtra()
  qiniu.io.put(token, key, buffer, extra, function(err, ret) {
    if(!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId) 
      res.end(qn_url+ret.key)      
    } else {
      // 上传失败， 处理返回代码
      console.log(err)
    }
  })
}
