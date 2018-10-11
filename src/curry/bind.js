Function.prototype.bind1 = function(...args) {
    const that = this;
    const ctx = args.shift();
    return function(...rest) {
        that.apply(ctx, args.concat(rest))
    }
}

function log() {
    console.log(this, arguments)
}
debugger
const fn = log.bind1({a: 222}, 1, 2, 3, 4)
fn(5, 6, 7, 8);