import isString from './isString';
import isNumber from './isNumber';
import isArray from './isArray';
import isBool from './isBool';
import isFunc from './isFunc';
import isObject from './isObject';
import isRegExp from './isRegExp';
import isDate from './isDate';
import isPlainObject from './isPlainObject';


export default {
	isString,
	isNumber,
	isArray,
	isBool,
	isFunc,
	isRegExp,
	isDate,
	isPlainObject
}

// test
console.log(isArray([]))
console.log(isPlainObject({}))