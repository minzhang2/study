import toString from './toString'

// 是否是Number类型
export default function isNumber(value) {
	return typeof value === 'number' || toString(value) === 'Number';
}