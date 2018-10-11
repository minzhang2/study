import toString from './toString'

// 是否是String类型
export default function isString(value) {
	return typeof value === 'string' || toString(value) === 'String';
}