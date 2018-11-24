/**
 * 节流：降低频繁操作的频率为delay毫秒触发一次
 * @param {Function} fn
 * @param {Number} delay
 */
function throttle(fn, delay) {
  let canRun = true;
  return function(...args) {
    const context = this;
    if(!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}
