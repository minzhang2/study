'use strict'

// http://www.runoob.com/js/js-strict.html
// 1.如果一个变量未声明会报错
// x = '22'

// 2.删除变量或方法会报错
// function fn() {}
// delete fn;
// var x = 3;
// delete x;

// 3.不能使用arguments.callee
function f() {
    arguments.callee;
}

// 4.不能对一些关键字进行赋值
// let eval = 22