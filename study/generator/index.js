function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        next(undefined, result.value);
    }

    next();
}

function* g() {
    const a = yield 1;
    const b = yield 2;
    const c = yield 3;
    console.log(a, b, c)
}

run(g);