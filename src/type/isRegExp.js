import toString from './toString'

// 是否是RegExp类型
export default function isRegExp(value) {
	return toString(value) === 'RegExp';
}