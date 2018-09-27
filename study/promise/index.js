import './Promise';

setTimeout(() => {
	console.log('setTimeoutStart')
}, 0)

new Promise(function (resolve, reject) {
	console.log('p')
	resolve(2)
}).then(function (res) {
	console.log(res)
})

setTimeout(() => {
	console.log('setTimeoutEnd')
}, 0)