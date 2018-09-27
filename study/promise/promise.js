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

function noop() {}

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
	this.data = null; // 存储数据
	this.resolvedCbs = []; // resolved回调函数集
	this.rejectedCbs = []; // rejected回调函数集

	// 处理resolved情况
	const resolve = (res) => {
		if (this.status === 'pending') {
			this.state = 'fulfilled';
			this.data = res;
			setTimeout(() => {
				for (let i = 0, len = this.resolvedCbs.length; i < len; i++) {
					this.resolvedCbs[i](this.data);
				}
			}, 0)
		}
	}

	// 处理rejected情况
	const reject = (res) => {
		if (this.status === 'pending') {
			this.state = 'rejected';
			this.data = res;
			setTimeout(() => {
				for (let i = 0, len = this.rejectedCbs.length; i < len; i++) {
					this.rejectedCbs[i](this.data);
				}
			}, 0)
		}
	}

	exec(resolve, reject);
}

Promise.prototype.then = function (resolve = noop, reject = noop) {
	this.resolvedCbs.push(resolve);
	this.rejectedCbs.push(reject);
	//  cb(this.data);
}