// import './thunkGen'
// import './promiseGen'
// import './co'

/**
 * 简单实现co
 */
function query() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}

function *generate() {
  const a = yield query();
  const b = yield query();
  console.log(a, b)
}

function run(generate) {
  const gen = generate();
  const next = (v) => {
    const { value, done } = gen.next(v);
    if(done) {
      return;
    }
    value.then(res => {
      next(res);
    })
  }
  next();
}

run(generate);
