const bind = (function event() {
    if(window.addEventListener) {
        return function(ele, event, handler, captrue = false) {
            ele.addEventListener(event, handler, captrue)
        }
    } else if(window.attachEvent) {
        return function(ele, event, handler) {
            ele.attachEvent('on' + event, handler);
        }
    } else {
        ele['on' + event] = handler;
    }
})();
bind(document.body, 'click', function() { console.log(this, arguments) })