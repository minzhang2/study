const noop = () => {};
const toString = {}.toString;
const isObject = value => toString.call(value).slice(8, -1) === 'Object';
let uid = 0;

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
export default class Promise {
  constructor(exec) {
    this.status = 'pending';
    this.value = null;
    this.resolveCb = noop;
    this.rejectCb = noop;
    this.uuid = uid++;

    exec(this._resolve, this._reject);
  }
  _resolve = (value) => {
    if(this.status === 'pending') {
      this.status = 'fulfilled';
      this.value = value;
      nextTick(() => {
        this.resolveCb();
      })
    }
  }
  _reject = (value) => {
    if(this.status === 'pending') {
      this.status = 'rejected';
      this.value = value;
      nextTick(() => {
        this.rejectCb();
      })
    }
  }
  _safeRun = (thenResolveOrReject, resolve, reject, isResolveOrReject) => {
    var p = thenResolveOrReject(this.value);
    try {
      if(p instanceof Promise) {
        p.then(resolve, reject);
      } else {
        const fn = isResolveOrReject ? resolve : reject;
        fn(this.value);
      }
    } catch(err) {
      reject(err);
    }
  }
  static resolve(value) {
    if(value instanceof Promise) {
      return value;
    } else if(isObject(value) && typeof value.then === 'function') {
      return new Promise((resolve, reject) => {
        value.then(resolve, reject);
      });
    } else {
      return new Promise(resolve => resolve(value));
    }
  }
  static reject(err) {
    return new Promise((_, reject) => {
      reject(err)
    })
  }
  static catch(reject) {
    this.then(null, reject);
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      const ret = [];
      let i = 0;
      const next = () => {
        Promise.resolve(promises[i]).then(res => {
          ret.push(res);
          i++;
          if(i === promises.length) {
            resolve(ret);
          } else {
            next();
          }
        }, err => {
          return reject(err);
        });
      }
      next();
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      Promise.resolve(promises[0]).then(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  then(thenResolve, thenReject) {
    thenResolve = typeof thenResolve === 'function' ? thenResolve : value => value;
    thenReject = typeof thenReject === 'function' ? thenReject : err => {throw err};

    if (this.status === 'pending') {
      return new Promise((resolve, reject) => {
        this.resolveCb = () => {
          this._safeRun.call(this, thenResolve, resolve, reject, true);
        };
        this.rejectCb = () => {
          this._safeRun.call(this, thenReject, resolve, reject, false);
        };
      })
    } else if (this.status === 'fulfilled') {
      return new Promise((resolve, reject) => {
        this._safeRun.call(this, thenResolve, resolve, reject, true);
      });
    } else if (this.status === 'rejected') {
      return new Promise((resolve, reject) => {
        this._safeRun.call(this, thenReject, resolve, reject, false);
      });
    }
  }
}
