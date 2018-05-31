import toString from './toString'

// 是否是Object类型
export default function isObject(value) {
	const type = typeof value;
	return value != null && (type == 'object' || type == 'function');
	
//	const type = toString(value);
//	return value != null && (type == 'Object' || type == 'Function');
}