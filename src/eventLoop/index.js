/**
 * 参考vue源码v2.5.17
 * js是单线程执行，所以只有一个主进程任务
 * 当主进程任务队列执行完毕就会执行微任务队列
 * 然后再执行宏任务，该宏任务执行完再执行微任务
 * 如此循环称作“事件循环”
 * 参考：
 * https://segmentfault.com/a/1190000012362096#articleHeader6
 * https://juejin.im/post/59e85eebf265da430d571f89
 * @param {Function} cb 回调函数
 */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

/**
 * 宏任务
 * @param {Function} cb 回调函数
 */
function macroTask(cb) {
  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    setImmediate(cb);
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


/**
 * 微任务
 * @param {Function} cb 回调函数
 */
function microTask(cb) {
  if (typeof Promise !== 'undefined' && isNative(Promise) && false) {
    const p = Promise.resolve();
    p.then(cb);
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
  } else {
    macroTask(cb);
  }
}

export {
  macroTask,
  microTask
}