import toString from './toString'
import isObject from './isObject'

// 是否是Function类型
export default function isFunc(value) {
	if(!isObject(value)) {
		return false;
	}
	const type = toString(value);
	return typeof value === 'function' || type === 'Function' || type === 'AsyncFunction' || type === 'GeneratorFunction' || type === 'Proxy';
}