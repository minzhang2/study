
import { microTask } from '../eventLoop'

/**
 * 模拟异步执行
 */
function lazyMan() {
  this.tasks = [];
  // 使用微任务首次执行
  microTask(() => {
  	this.next();
  })
}
lazyMan.prototype = {
	constructor: lazyMan,
  eat() {
  	const that = this;
    this.tasks.push(function() {
    	setTimeout(() => {
        console.log('eat end at 2 second later')
        that.next();
      }, 2000)
    })
    return this;
  },
  sleep() {
 		const that = this;
    this.tasks.push(function() {
    	setTimeout(() => {
        console.log('sleep end at 1 second later');
        that.next();
      }, 1000)	
    })
    return this;
  },
  next() {
  	const task = this.tasks.shift();
    task && task();
  }
}
const man = new lazyMan();
man.sleep().eat();