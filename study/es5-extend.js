/**
 * 模拟实现基于es5的js的继承
 */

// 当浏览器不支持Object.create的时候使用该方法替代
(typeof Object.create !== 'function') && (Object.create = function(obj) {
	const F = function() {};
	F.prototype = obj;
	return new F();
})

// 当浏览器不支持Object.merge的时候使用该方法替代
(typeof Object.assign !== 'function') && (Object.assign = function(target) {
	if(target === undefined || target === null) {
		throw new TypeError('target should not be undefined or null')
	}
	
	var output = Object(target);
	for(var i = 1, len = arguments.length; i < len; i++) {
		var item = arguments[i];
		if(!(item === undefined || item === null)) {
			for(var prop in item) {
				if(item.hasOwnProperty(prop)) {
					output[prop] = item[prop];
				}
			}
		}
	}
	return output;
})

// 父类
function Parent(x) {
	this.x = x;
}

Parent.prototype = {
	construct: Parent,
	setX(x) {
		this.x = x;
	},
	getX() {
		return this.x;
	}
};

// 子类
function Child(x, y) {
	// 实现对父类属性的继承
	Parent.call(this, x);
	this.y = y;
}

// 实现对父类方法的继承
Child.prototype = Object.assign(Object.create(Parent.prototype), {
	construct: Child,
	setY(y) {
		this.y = y;
	},
	getY() {
		return this.y;
	}
});

const c = new Child(1, 2)