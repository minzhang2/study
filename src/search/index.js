/**
 * 非递归实现
 *
 * @param {*} arr
 * @param {*} target
 * @returns
 */
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1, mid;
  while(low <= high) {
    mid = parseInt((low + high) / 2);
    if(arr[mid] > target) {
      high = mid - 1;
    } else if(arr[mid] < target) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
}
/**
 * 递归实现
 *
 * @param {*} arr
 * @param {*} target
 * @returns
 */
function binarySearch2(arr, target, low, high) {
  low = low || 0; high = high || arr.length - 1;
  let mid = parseInt((low + high) / 2);
  if(arr[mid] > target) {
    return binarySearch2(arr, target, low, mid - 1);
  } else if(arr[mid] < target) {
    return binarySearch2(arr, target, mid + 1, high);
  } else {
    return mid;
  }
}
console.time(1);
console.log(binarySearch([1, 3, 4, 5, 6, 7, 8], 6));
console.timeEnd(1);
console.time(2);
console.log(binarySearch2([1, 3, 4, 5, 6, 7, 8], 6));
console.timeEnd(2);
