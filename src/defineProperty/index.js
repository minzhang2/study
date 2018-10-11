/**
 * 参考：http://imweb.io/topic/56d40adc0848801a4ba198ce
 * 不用definePropery定义属性，configurable，writable，enumerable默认为true
 * 如果使用definePropery定义属性，不设置configurable，writable，enumerable的情况下，默认为false
 */

const a = {};

Object.defineProperty(a, 'b', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: 5
})

// 当writable为false时，修改属性值时无法修改
a.b = 4;

// 当enumerable为false时，无法遍历该属性
for(let k in a) console.log(k)

// 当configurable为false的时候无法删除该属性且无法定义（configurable，writalbe，enumerable）
delete a.b
Object.defineProperty(a, 'b', {
    writable: true
})
a.b = 6;