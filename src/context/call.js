Function.prototype.call1 = function(context) {
    const args = [].slice.call(arguments, 1);
    context = context === null ? window : Object(context);
    context.fn = this;
    const result = eval('context.fn(' + args + ')')
    delete context.fn;
    return result;
}
function fn() {
	console.log(this, arguments)
}
fn.call1({a: 2}, 2,3,4,5)