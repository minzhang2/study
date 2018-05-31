import toString from './toString'

// 是否是Date类型
export default function isDate(value) {
	return toString(value) === 'Date';
}