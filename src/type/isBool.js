import toString from './toString'

// 是否是Boolean类型
export default function isBool(value) {
	return typeof value === 'boolean' || value === true || value === false || toString(value) === 'Boolean';
}