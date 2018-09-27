console.log = function(str) {
	var node = document.createElement("p");
  node.innerHTML = str;
  document.body.appendChild(node);
}

/**
 * @description 模拟读取文件
 */
var file = {
    'file1.txt': "file2.txt",
    'file2.txt': 'Hello, Generator!'
};
function _readFile(filename, cb) {
    setTimeout(function() {
        cb(null , file[filename]);
    }, 100)
}
function _readFileSync(filename, cb) {
  cb(null, file[filename]);
}
/** 睡眠函数 **/
function _sleep(ms, cb) {
    setTimeout(function() {
        cb(null , "已经睡眠" + ms + "ms, time is up!");
    }, ms);
}
/**
* 重写thunkify函数，使其能兼容同步任务
*/
function thunkify(fn) {
  return function(){
    var args = [].slice.call(arguments);
    var ctx = this;
    return function(done) {
      var called;
      args.push(function(){
        if(called) return ;
        called = true;
        done.apply(null, arguments);
      })
      try{
        fn.apply(ctx, args); // 将任务函数置后运行
      } catch(ex) {
        done(ex);
      }
    }
  }
}
/** 自动化运行器 **/
function run(generator) {
    var gen = generator();
    function next(data) {
        var ret = gen.next(data);
        // 将数据传回Generator
        if (ret.done)
            return;
        ret.value(function(err, data) {
            if (err)
                throw (err);
            next(data);
        });
    }
    next(); // 启动任务
}
var readFile = thunkify(_readFileSync); // 将_readFile thunk化
var sleep = thunkify(_sleep); // 将_sleep thunk化

/** 主任务函数 **/
function *flow() {
    var file1 = yield readFile("file1.txt");
    console.log('file1的内容是: ' + file1);
    console.log(yield sleep(2000))
    // sleep 1s
    var file2 = yield readFile(file1);
    console.log('file2的内容是: ' + file2);
}

run(flow); // 运行
