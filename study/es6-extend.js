/**
 * 模拟实现基于es6的js的继承
 * 实现了es5的继承总觉得用起来不是那么的爽
 * 不能像es6那样通过extends关键字继承
 * 每次都要手动去继承属性和方法
 */

// 简单的extends继承
 class Parent{
   // static属性和方法 
   static sex = 'man'

   static getSex() {
     console.log(Parent.sex)
   }
   
   // 构造函数 
   constructor(name) {
     this.name = name
   }
   
   // 非静态方法
   say() {
     console.log(this.name)
   }
 }
 
 class Child extends Parent {
   static sex = 'women'
   
   constructor(name, age) {
      super(name)
      
      this.age = age
   }
   
   say() {
     console.log(this.name, this.age)
   }
 }