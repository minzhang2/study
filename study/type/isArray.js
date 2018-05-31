import toString from './toString'

// 是否是Array类型
export default function isArray(value) {
	return Array.isArray(value) || toString(value) === 'Array';
}