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

/**
 * 自动化运行器
 * @param {GeneratorFunction} generator
 */
function run(generator) {
    const g = generator();

    function next(data) {
        const {value, done} = g.next(data);
        if (done) {
            return;
        }
        value(function (err, data) {
            if (err) {
                throw err;
            }
            next(data)
        })
    }
    // 启动执行
    next();
}

function asyncQuery(cb) {
    setTimeout(() => {
        cb(null, 10)
    }, 1000)
}

// thunk化
const query = thunkify(asyncQuery);

function * generator() {
    const data = yield query();
    console.log(data);
}

run(generator)