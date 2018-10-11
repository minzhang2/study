const obj = {
    a: 123,
    b: '222',
    c: [1, 2, 3],
    d: {
        a: 22
    }
}

// 对对象进行代理，当对对象进行获取，修改操作等会进入对应的钩子函数
window.proxy = new Proxy(obj, {
    // 当获取对象的属性时会进入
    get(target, key, proxy) {
        return target[key];
    },
    // 当对对象的属性进行修改时进入
    set(target, key, value, proxy) {
        target[key] = value;
    },
    // 进行xx in obj操作时会进入
    has(target, key) {
        return key in target;
    }
})