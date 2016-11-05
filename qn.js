var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'kfqZfOlTwhys5WVJxQo4SkRey0IFSsNgYRzaoLEt';
qiniu.conf.SECRET_KEY = 'a_bOV7yWMKb9ooJj9MARRIhR5WlnLPkVU-NXk-AN';

//要上传的空间
bucket = 'ross';

//上传到七牛后保存的文件名
var d = new Date()
key = 'local-'+d.getTime()+'.jpg';

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

//生成上传 Token
token = uptoken(bucket, key);

//构造上传函数
exports.uploadFile = function(res, buffer) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.put(token, key, buffer, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId); 
        res.end(ret.key)      
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}
