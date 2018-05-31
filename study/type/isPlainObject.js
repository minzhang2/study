import isObject from './isObject'

// 是否是纯对象类型
export default function isPlainObject(value) {
	if(!isObject(value)) {
		return false;
	}
	for(let prop in value) {
		return false;
	}
	return true;
}