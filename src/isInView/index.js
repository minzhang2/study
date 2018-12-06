const box = document.querySelector('#box');
const docEle = document.documentElement;

function throttle(fn, delay=500) {
  let last;
  return function(...args) {
    let now = Date.now();
    if(last && now < last + delay) {
      clearTimeout(fn.id);
      fn.id = setTimeout(() => {
        fn.apply(this, args);
        last = now;
      }, delay);
    } else {
      fn.apply(this, args);
      last = now;
    }
  }
}
document.body.onscroll = throttle(function() {
  console.log(isInViewRect(box))
})

function getOffset(el) {
  let offsetLeft = 0;
  let offsetTop = 0;
  let offsetParent = el;
  do {
    offsetLeft += offsetParent.offsetLeft;
    offsetTop += offsetParent.offsetTop;
  } while(offsetParent = offsetParent.offsetParent)
  return {
    offsetLeft,
    offsetTop,
    offsetWidth: el.offsetWidth,
    offsetHeight: el.offsetHeight
  };
}

function getScroll(el) {
  return {
    scrollLeft: el.scrollLeft,
    scrollTop: el.scrollTop,
    clientWidth: el.clientWidth,
    clientHeight: el.clientHeight,
  }
}

/**
 * 判断元素是否在可视范围内（使用offset实现）
 * @param {*} el
 */
function isInView(el) {
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = getOffset(el);
  const { scrollLeft, scrollTop, clientWidth, clientHeight } = getScroll(docEle);

  // 元素下侧超出可视区域上侧
  // 元素上侧超出可视区域下侧
  // 元素左侧超出可视区域右侧
  // 元素右侧超出可视区域左侧
  if(offsetTop > scrollTop + clientHeight ||
    offsetTop + offsetHeight < scrollTop ||
    offsetLeft > scrollLeft + clientWidth ||
    offsetLeft + offsetWidth < scrollLeft) {
    return false;
  } else {
    return true;
  }
}

/**
 * 判断元素是否在可视范围内（使用getBoundingClientRect实现）
 * @param {*} el
 */
function isInViewRect(el) {
  const { top, right, bottom, left } = el.getBoundingClientRect();
  const { clientWidth, clientHeight } = getScroll(docEle);

  // 元素下侧超出可视区域上侧
  // 元素上侧超出可视区域下侧
  // 元素左侧超出可视区域右侧
  // 元素右侧超出可视区域左侧
  if(top > clientHeight ||
    bottom < 0 ||
    left > clientWidth ||
    right < 0) {
    return false;
  } else {
    return true;
  }
}
