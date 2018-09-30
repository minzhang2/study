import  Promise from './Promise';
// import Promise from './lie';

window.pro = new Promise(function (resolve, reject) {
	console.log('p')
	resolve(2)
})/*.then(res => {
	return new Promise(resolve => setTimeout(() => resolve(res), 1000));
}) */.then(res => res).then(res => console.log(res))