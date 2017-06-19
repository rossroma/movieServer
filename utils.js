
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

exports.answerMatch = function (answer, result) {
  let isMatch = false
  let answers = result.answers || [] // 获取答案数组
  let aka = result.aka.replace(/\((.+?)\)/g, '').split(' / ') // 获取格式化后的电影别名
  answers = answers.concat(aka, result.title, result['original_title']) // 拼接为一个数组
  answers.forEach(item => {
    let format = item.replace(/[\s-!\?:]/g, '').toLowerCase()
    if (answer === format) {
      isMatch = true
    }
  })
  return isMatch
}
