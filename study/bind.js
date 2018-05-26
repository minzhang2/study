/*
 * 实现原生bind的功能
 *
 * const fn = (function() {
 *   console.log(this);
 *   console.log(arguments);
 * }).bind1(11111)
 * fn(22222)
 *
 */

Function.prototype.bind1 = function(context, ...args) {
	const that = this;
//	return function(...rest) {
//		that.apply(context, [...args, ...rest])
//	}
	
	// 修复prototype指向不对的问题
	const func = function(...rest) {
		that.apply(context, [...args, ...rest])
	}
	func.prototype = that.prototype;
	return func;
}

const print = function() {
	console.log(this);
	console.log(arguments);
}
print.prototype.test = function() {
	console.log('test')
}
const bindPrint = print.bind1(11111, 2, '2', [1, 2], {})

bindPrint(22222)