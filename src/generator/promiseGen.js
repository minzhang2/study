/**
 * thunkify函数
 * @param {Function} fn
 * @returns
 */
function thunkify(fn) {
    return function (...args) {
        const that = this;
        return function (done) {
            let called;
            args.push(function () {
                if (called) {
                    return;
                }
                called = true;
                done.apply(null, arguments);
            });
            try {
                fn.apply(that, args);
            } catch (err) {
                done(err)
            }
        }
    }
}

function toPromise(fn) {
    return function (...args) {
        var thunkifyToPromise = thunkify(fn).apply(this, args);
        return new Promise((resolve, reject) => {
            thunkifyToPromise((err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        })
    }
}

/**
 * 自动化运行器
 * @param {GeneratorFunction} generator
 */
function run(generator) {
    var gen = generator();

    function next(data) {
        const { value, done } = gen.next(data);
        if (done) {
            return Promise.resolve("done");
        }
        return Promise.resolve(value)
                .then(data => next(data))
                .catch(err => gen.throw(err));
    }
    try {
        return next();
    } catch (err) {
        return Promise.reject(err);
    }
}

function asyncQuery(cb) {
    // setTimeout(() => {
        cb(null, 10)
    // }, 1000)
}

// thunk化
const query = toPromise(asyncQuery);

function* generator() {
    const data = yield query();
    console.log(data);
}

run(generator)
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})