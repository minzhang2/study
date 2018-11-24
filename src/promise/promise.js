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
 * 参考：http://es6.ruanyifeng.com/#docs/promise#Promise-resolve
 * 		https://github.com/xieranmaya/blog/issues/3
 * 		https://github.com/libin1991/webpack4-vue-more-page-cli/blob/master/A%E9%9D%A2%E8%AF%95%E4%BB%A3%E7%A0%81%E5%BA%93/js/Promise.js
 */

const noop = () => {}
const toString = {}.toString;

/**
 * cb
 */
function Promise(exec = noop) {
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

Promise.prototype.then = function (onResolved = noop, onRejected = noop) {
	let p;

	onResolved = typeof onResolved === 'function' ? onResolved : (value => value);
	onRejected = typeof onRejected === 'function' ? onRejected : (err => { throw err });

	const safeRun = function(thenCb, promiseCb, reject) {
		try {
			const x = thenCb(this.value)
			if (x instanceof Promise) {
				x.then(resolve, reject)
			} else {
				promiseCb(x)
			}
		} catch (err) {
			reject(err);
		}
	}

	if (this.status === 'pending') {
		return p = new Promise((resolve, reject) => {
			this.resolved = () => {
				safeRun.call(this, onResolved, resolve, reject)
			};
			this.rejected = () => {
				safeRun.call(this, onRejected, reject, reject)
			};
		})
	} else if (this.status === 'fulfilled') {
		return p = new Promise((resolve, reject) => {
			safeRun.call(this, onResolved, resolve, reject)
		});
	} else if (this.status === 'rejected') {
		return p = new Promise((resolve, reject) => {
			safeRun.call(this, onRejected, reject, reject)
		});
	}
}

Promise.prototype.catch = function(onRejected) {
	return this.then(null, onRejected);
}

/**
 * 1.如果是Promise实例，原封不动的返回该Promise
 * 2.如果是对象类型，并且实现了then方法，则创建一个新的Promise实例，并且直接执行then
 * 3.其他情况则创建一个新的Promise实例，实例置为fulfill状态，value设置为该值
 * 被拒绝（rejected）：操作失败；
*/
Promise.resolve = function(value) {
	if(value instanceof Promise) {
		return value;
	} else if(toString.call(value).slice(8, -1) === 'Object' && typeof value.then === 'function') {
		return new Promise((resolve, reject) => {
			value.then(resolve, reject);
		});
	} else {
		return new Promise(resolve => resolve(value));
	}
}

Promise.reject = function(err) {
	return new Promise((resolve, reject) => {
		reject(err)
	})
};

/**
 * const p = Promise.all([p1, p2, p3]);
 * p的状态由p1、p2、p3决定，分成两种情况。
 * 1.只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
 * 2.只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
*/
Promise.all = function(promises) {
	const ret = [];
	return new Promise((resolve, reject) => {
		let lastIndex = promises.length - 1;
		let index = 0;
		while(index <= lastIndex) {
			Promise.resolve(promises[index]).then(res => {
				ret.push(res)
				if(index === lastIndex) {
					return resolve(ret);
				}
			}, err => {
				return reject(err);
			});
			index++;
		}
	})
}

/**
 * const p = Promise.race([p1, p2, p3]);
 * 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
*/
Promise.race = function(promises) {
	return new Promise((resolve, reject) => {
		let lastIndex = promises.length - 1;
		let index = 0;
		while(index <= lastIndex) {
			promises[index].then(res => {
				return resolve(res);
			}, err => {
				return reject(err);
			});
			index++;
		}
	})
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

window.Promise = Promise;
export default Promise;