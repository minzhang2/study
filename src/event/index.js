function registerLongTap(el) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('longTap', true, true);

    let timeout;
    el.addEventListener('mousedown', function() {
        timeout = setTimeout(() => {
            el.dispatchEvent(event);
        }, 300);
    }, false);
    el.addEventListener('mouseup', function() {
        clearTimeout(timeout);
    }, false);
}
const root = document.getElementById('root')
registerLongTap(root)
root.addEventListener('longTap', function() {
	debugger
}, false);