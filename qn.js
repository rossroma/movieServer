const qiniu = require("qiniu")
const request = require('request')
const Conf = require('./conf.js')

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = Conf.qiniu.accessKey
qiniu.conf.SECRET_KEY = Conf.qiniu.secretKey

//要上传的空间
bucket = Conf.qiniu.bucket

// 七牛图片域名
const qn_url = Conf.qiniu.url

// 生成图片名称
function upkey () {
	const d = new Date()
	return `gm-${d.getTime().jpg}`
}

//在线上传
exports.fetch = function(res, picUrl) {
	const key = upkey()
	// EncodedEntryURI
	const entry = `${bucket}:${key}`
	const encodedEntryURI = qiniu.util.urlsafeBase64Encode(entry)

	// EncodedURL
	const pic = new Buffer(picUrl).toString('base64')
	const basePic = qiniu.util.base64ToUrlSafe(pic)

	// AccessToken
	const url = `http://iovip.qbox.me/fetch/${basePic}/to/${encodedEntryURI}`
	AccessToken = qiniu.util.generateAccessToken(url)
	const options = {
		method: 'POST',
	  url: url,
	  headers:{
	    'authorization': AccessToken,
	    'content-type': 'application/x-www-form-urlencoded'
	  }
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		const picInfo = {
			path: qn_url,
			name: JSON.parse(body).key
		}
		res.end(JSON.stringify(picInfo))
	})
}

//本地上传
exports.uploadFile = function(res, buffer) {
	const key = upkey()

	//构建上传策略函数
	function uptoken(bucket, key) {
	  const putPolicy = new qiniu.rs.PutPolicy(`${bucket}:${key}`)
	  return putPolicy.token()
	}
	//生成上传 Token
	token = uptoken(bucket, key)

  const extra = new qiniu.io.PutExtra()
  qiniu.io.put(token, key, buffer, extra, function(err, ret) {
    if(!err) {
      // 上传成功， 处理返回值
      console.log(ret.key)
      res.end(qn_url + ret.key)
    } else {
      // 上传失败， 处理返回代码
      console.log(err)
    }
  })
}
