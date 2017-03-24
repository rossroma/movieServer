
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
