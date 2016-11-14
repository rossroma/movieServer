// 首页随机显示剧照函数
// init 传入剧照总数，并生成一个数组
// sendNum 返回一个随机数，并将其移除数组
exports.randomNum = function () {
	var arr = []
	var countVal
	return {
		init: function (count) {
			countVal = count
			arr.length = 0
			for (let i = 0; i < count; i ++) {
				arr.push(i)
			}
			return this.sendNum()
		},
		sendNum: function () {
			function decrement () {
				arr.splice(num, 1)
			}
			if (arr.length) {
				var num = Math.floor(Math.random() * arr.length)
				setTimeout(decrement, 50)
				return arr[num]
			} else {
				// console.log('countVal ' + countVal)
				return this.init(countVal)
			}
		}
	}
}

// 给剧照难度评级
exports.rating = function (objRat, newRat) {
	const newStars = objRat.stars-(-1)
	const newTotal = objRat.total - (-newRat)
	const newAverage = (newTotal/newStars).toFixed(2)
	return {
		average:newAverage,
		stars:newStars,
		total:newTotal
	}
}