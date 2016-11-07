// 首页随机显示剧照函数
// init 传入剧照总数，并生成一个数组
// sendNum 返回一个随机数，并将其移除数组
exports.randomNum = function () {
	var arr = []
	var that = this
	var countVal
	this.init = function (count) {
		countVal = count
		arr.length = 0
		for (let i = 0; i < count; i ++) {
			arr.push(i)
		}
		return that.sendNum()
	}
	this.sendNum = function () {
		function ddd () {
			arr.splice(num, 1)
		}
		if (arr.length) {
			var num = Math.floor(Math.random() * arr.length)
			setTimeout(ddd, 50)
			return arr[num]
		} else {
			// console.log('countVal ' + countVal)
			return that.init(countVal)
		}	
	}
}

exports.rating = function (objRat, newRat) {
	var average,stars,total
	if (objRat) {
		average = objRat.average
		stars = objRat.stars
		total = objRat.total
	}
	var newStars = stars-(-1)
	var newTotal = total - (-newRat)
	var newAverage = (newTotal/newStars).toFixed(2)
	return {average:newAverage,stars:newStars,total:newTotal}
}