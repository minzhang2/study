Function.prototype.apply1 = function(context, arr) {
    context = context === null ? window : Object(context);
    context.fn = this;
    let result;
    if(arr) {
        result = context.fn();
    } else {
        const args = [].slice.call(arr);
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn;
    return result;
}
function fn() {
	console.log(this, arguments)
}
fn.call1({a: 2}, 2,3,4,5)