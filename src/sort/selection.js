/**
 * 选择排序
 * 每次循环找到最小值放到未排序集合的最前面
 * @param {*} arr
 * @returns
 */
function selection(arr) {
  let minIndex, temp;
  for(let i = 0, len = arr.length; i < len - 1; i++) {
    minIndex = i;
    for(let j = i + 1; j < len; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
console.log(selection([4, 2, 5, 1, 7, 4, 8, 3, 8]));
