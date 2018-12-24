/**
 * 冒泡排序
 * 每一次循环找到最大的数字，并放到未排序集合的最后面
 * @param {*} arr
 * @returns
 */
function bubble(arr) {
  for(let i = 0, len = arr.length; i < len - 1; i++) {
    for(let j = 0; j < len - 1 - i; j++) {
      if(arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
console.log(bubble([4, 2, 5, 1, 7, 4, 8, 3, 8]));
