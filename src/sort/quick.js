/**
 * 快速排序
 * 采用分块的思想，将集合分为很多小块提升排序速度
 * 先选取一个点作为基准点（起始点），然后从基准点
 * 的下一个元素为起点进行遍历，将小于基准点的元素
 * 与未排序集合的第一个元素进行交换，最后将基准元
 * 素与已排序集合的最后一个元素交换，然后对左右块
 * 执行上述操作，直到left >= right为止
 *
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 */
function quick(arr, left, right) {
	left = left || 0;
  right = right || arr.length - 1;
  if(left < right) {
  	let partitionIndex = partition(arr, left, right);
    quick(arr, left, partitionIndex - 1);
    quick(arr, partitionIndex + 1, right);
  }
  return arr;
}
function partition(arr, left, right) {
	let pivot = left,
  		index = pivot + 1;
  for(let i = index; i <= right; i++) {
  	if(arr[i] < arr[pivot]) {
    	swap(arr, i, index);
    	index++;
    }
  }
  swap(arr, pivot, index - 1);
  return index - 1;
}
function swap(arr, i, j) {
	let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * 快速排序阮一峰版
 * 占用内存比较多，但是理解起来简单
 *
 * @param {*} arr
 * @returns
 */
function quick2(arr) {
  if(arr.length <= 1) { return arr };
  let pivotIndex = parseInt(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1);
  let left = [], right = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quick2(left).concat(pivot, quick2(right));
}
console.time(1);
console.log(quick([8,7,10,9,6]))
console.timeEnd(1);
console.time(2);
console.log(quick2([8,7,10,9,6]))
console.timeEnd(2);
