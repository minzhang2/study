/**
 * 节流：降低频繁操作的频率为delay毫秒触发一次
 * @param {Function} fn
 * @param {Number} delay
 */

// 第一种实现方式
function throttle(fn, delay) {
  let canRun = true;
  return function(...args) {
    if(!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, delay);
  }
}

// 第二种实现方式
function throttle(fn, delay) {
	let last;
  return function(...args) {
  	let now = Date.now();
    if(last && now < last + delay) {
    	clearTimeout(fn.id);
      fn.id = setTimeout(() => {
      	last = now;
      	fn.apply(this, args);
      }, delay);
    } else {
    	last = now;
    	fn.apply(this, args);
    }
  }
}
