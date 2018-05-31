/**
 * 模拟实现基于es6的js的继承
 * 实现了es5的继承总觉得用起来不是那么的爽
 * 不能像es6那样通过extends关键字继承
 * 每次都要手动去继承属性和方法
 * 
 * es6的继承有两个关键点： 
 * 1._inherits继承父类的方法
 * 2.(Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name)继承父类的属性
 */

// 简单的extends继承
class Parent {
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

const c = new Child(1, 2)

/*

通过babel编译后的代码

'use strict';

// 将属性和方法挂在到构造函数上
var _createClass = function () {
	// 重新定义Object.defineProperties方法
	// 第二个参数变成了一个数组
	// 使用函数柯里化避免每次都加载defineProperties
	// 希望构造函数不可枚举
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function (Constructor, protoProps, staticProps) {
		// 如果是普通方法则挂在到prototype上
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		// 如果是静态方法则挂在constructor上
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();

// 正常继承时call为undefined，当__proto__为Object时取call
function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

// 与es5的继承类似，继承父类的方法
// 通过Object.create集成父类的prototype，并修改constructor指向
// 将子类的__proto__执行父类，这样可以判断父子关系
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

// 如果不是通过new方式调用则会报错
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

// 简单的extends继承
var Parent = function () {
	_createClass(Parent, null, [{
		key: 'getSex',
		value: function getSex() {
			console.log(Parent.sex);
		}

		// 构造函数 

		// static属性和方法 

  }]);

	function Parent(name) {
		_classCallCheck(this, Parent);

		this.name = name;
	}

	// 非静态方法


	_createClass(Parent, [{
		key: 'say',
		value: function say() {
			console.log(this.name);
		}
  }]);

	return Parent;
}();

Parent.sex = 'man';

var Child = function (_Parent) {
	// 1.通过_inherits(Child, _Parent)继承父类的方法
	_inherits(Child, _Parent);

	function Child(name, age) {
		_classCallCheck(this, Child);
		
		// 2.通过(Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name)继承父类的属性
		var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

		_this.age = age;
		return _this;
	}

	_createClass(Child, [{
		key: 'say',
		value: function say() {
			console.log(this.name, this.age);
		}
  }]);

	return Child;
}(Parent);

Child.sex = 'women';

var c = new Child(1, 2);

*/