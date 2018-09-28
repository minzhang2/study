/**
 * ajax
 * readyState:
 * 0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
 * 1 (初始化) 对象已建立，尚未调用send方法
 * 2 (发送数据) send方法已调用，但是当前的状态及http头未知
 * 3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误
 * 4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据
 * status: 从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）　
 * @param {Object} options ajax的相关配置
 */
function ajax(options) {
    const noop = () => {}

    const defaults = {
        method: 'GET',
        async: true,
        data: {},
        type: 'json',
        success: noop,
        error: noop
    }

    const { url, method, async, data, type, headers, success, error } = { ...defaults, ...options };
    const isPost = method === 'POST';
    
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    
    /*
        a、向服务器提交数据的类型，即post还是get。
        b、请求的url地址和传递的参数。
        c、传输方式，false为同步，true为异步。默认为true。
        如果是异步通信方式(true)，客户机就不等待服务器的响应；
        如果是同步方式(false)，客户机就要等到服务器返回消息后才去执行其他操作。
    */
    xhr.open(method, url, async);

    if(headers) {
        for(let k in headers) {
            xhr.setRequestHeader(k, headers[k]);
        }
    }

    if(isPost) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            const res = type === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
            success(res);
        }else {
            error();
        }
    }
    // 当methods为POST时需要将数据塞到send里面
    xhr.send(isPost ? stringify(data) : undefined);
}

function stringify(obj) {
    let ret = '';
    for(let k in obj) {
        ret += `${k}=${obj[k]}&`
    }
    return ret.replace(/&$/, '');
}

ajax({
    url: 'https://randomuser.me/api?page=1',
    data: {
        results: 10,
        page: 1
    },
    success(res) {
        debugger
    }
});