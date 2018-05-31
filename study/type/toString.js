/**
 * 获取类型的字符串
 * @param {Any} value 被检测的变量
 * @return {String} 
 *
 * toString(1) => 'Number'
 * toString('1') => 'String'
 * toString(true) => 'Boolean'
 * toString(undefined) => 'Undefined'
 * toString(null) => 'Null'
 * toString([]) => 'Array'
 * toString(function(){}) => 'Function'
 * toString(async function(){}) => 'AsyncFunction'
 * toString(function* (){}) => 'GeneratorFunction'
 * toString({}) => 'Object'
 * toString(new Date) => 'Date'
 * toString(/a/) => 'RegExp'
 *
 */
export default function toString(value) {
	return Object.prototype.toString.call(value).slice(8, -1);
	
//	const toString = {}.toString;
//	return toString.call(value).slice(8, -1);
}