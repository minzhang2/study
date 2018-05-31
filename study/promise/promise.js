function noop() {}

export default function Promise(cb = noop) {
	this.status = 'pending'; // 状态：pending => fulfilled(resolved, rejected)
	this.data = null; // 存储数据
  this.resolvedCbs = []; // resolved回调函数集
  this.rejectedCbs = []; // rejected回调函数集
  
	// 处理resolved情况
	const resolve = (res) => {
		if(this.status === 'pending') {
			this.state = 'resolved';
			this.data = res;
			setTimeout(() => {
				for(let i = 0, len = this.resolvedCbs.length; i < len; i++) {
					this.resolvedCbs[i](this.data);
				}
			}, 0)
		}
  }
	
	// 处理rejected情况
  const reject = (res) => {
		if(this.status === 'pending') {
			this.state = 'rejected';
    	this.data = res;
			setTimeout(() => {
				for(let i = 0, len = this.rejectedCbs.length; i < len; i++) {
					this.rejectedCbs[i](this.data);
				}
			}, 0)
		}
  }
	
	cb(resolve, reject);
}

Promise.prototype.then = function(resolve = noop, reject = noop) {
	this.resolvedCbs.push(resolve);
	this.rejectedCbs.push(reject);
//  cb(this.data);
}