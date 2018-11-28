/**
 * 函数防抖：对于频繁触发的操作，空闲间隔为一定的时间才执行处理函数
 * @param {Function} fn
 * @param {Number} delay
 */
function debounce(fn, delay) {
  return function(...args) {
    clearTimeout(fn.id);
    fn.id = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}
