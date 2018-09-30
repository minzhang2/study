/**
 * promise => generator => async => core
 * 异步的相关原理
 * 
 * 1.promise: 指一个拥有符合规范的then方法的对象；
 * 2.thenable: 指一个定义了then方法的对象；
 * 3.决议（resolve）: 改变一个promise等待状态至已完成或被拒绝状态， 一旦决议，不再可变；
 * 4.值（value）: 一个任意合法的JavaScript值，包括undefined,thenable对象，promise对象；
 * 5.exception/error: JavaScript引擎抛出的异常/错误
 * 6.拒绝原因（reject reason）: 一个promise被拒绝的原因
 * 
 * 参考：https://zhuanlan.zhihu.com/p/26815654
 * https://juejin.im/post/5aa3f7b9f265da23766ae5ae
 */

const noop = () => {}

window.promises = {}

let id = 0;

/**
 * cb
 */
export default function Promise(exec = noop) {
	/**
	 * pending => resolve(fulfilled, rejected)
	 * 等待（pending）：初始状态；
	 * 已完成（fulfilled）：操作成功完成；
	 * 被拒绝（rejected）：操作失败；
	 */
	this.status = 'pending';
	this.value = null; // 存储数据
	this.resolved = noop; // 收集then
	this.rejected = noop; // 收集catch
	this.id = id++;
	promises[this.id] = this;

	// 处理resolved情况
	const resolve = (value) => {
		if (this.status === 'pending') {
			this.status = 'fulfilled';
			this.value = value;
			nextTick(() => {
				this.resolved(value);
			})
		}
	}

	// 处理rejected情况
	const reject = (value) => {
		if (this.status === 'pending') {
			this.status = 'rejected';
			this.value = value;
			nextTick(() => {
				this.rejected(value);
			})
		}
	}

	try {
		exec(resolve, reject);
	} catch (err) {
		reject(err)
	}

}

Promise.prototype.then = function (onResolved = value => value, onRejected = err => { throw err }) {
	let p;
	if (this.status === 'pending') {
		return p = new Promise((resolve, reject) => {
			this.resolved = value => {
				try {
					const x = onResolved(this.value)
					if (x instanceof Promise) {
						x.then(resolve, reject)
					}
				} catch (err) {
					reject(err);
				}
			};
			this.rejected = err => {
				try {
					const x = onRejected(this.value)
					if (x instanceof Promise) {
						x.then(resolve, reject)
					}
				} catch (err) {
					reject(err)
				}
			};
		})
	} else if (this.status === 'fulfilled') {
		return p = new Promise((resolve, reject) => {
			try {
				const x = onResolved(this.value);
				if (x instanceof Promise) {
					x.then(resolve, reject);
				} else {
					resolve(x);
				}
			} catch (err) {
				reject(err);
			}
		});
	} else if (this.status === 'rejected') {
		return p = new Promise((resolve, rejected) => {
			try {
				const x = onRejected(this.value);
				if (x instanceof Promise) {
					x.then(resolve, reject);
				} else {
					resolve(x);
				}
			} catch (err) {
				reject(err);
			}
		});
	}
}

// 参考immediate的顺序
function nextTick(cb) {
	if ((typeof process !== 'undefined') && !process.browser) {
		process.nextTick(cb);
	} else if (typeof MutationObserver !== 'undefined' && (
			isNative(MutationObserver) ||
			// PhantomJS and iOS 7.x
			MutationObserver.toString() === '[object MutationObserverConstructor]'
		)) {
		// use MutationObserver where native Promise is not available,
		// e.g. PhantomJS IE11, iOS7, Android 4.4
		let counter = 1
		const observer = new MutationObserver(cb)
		const textNode = document.createTextNode(String(counter))
		observer.observe(textNode, {
			characterData: true
		})
		counter = (counter + 1) % 2
		textNode.data = String(counter)
	} else if (typeof MessageChannel !== 'undefined' && (
			isNative(MessageChannel) ||
			// PhantomJS
			MessageChannel.toString() === '[object MessageChannelConstructor]'
		)) {
		const channel = new MessageChannel();
		const port = channel.port2;
		channel.port1.onmessage = cb;
		port.postMessage(1);
	} else {
		setTimeout(cb, 0);
	}
}

function isNative(Ctor) {
	return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}