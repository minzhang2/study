/**
 * 插入排序
 * 第一个数默认为有序的，然后依次取出后续数值，
 * 将其从有序集合的最大值比较到大最小值，知道
 * 找到其对应的位置
 * @param {*} arr
 * @returns
 */
function insertion(arr) {
  let preIndex, current;
  for(let i = 1, len = arr.length; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while(preIndex > 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
console.log(insertion([4, 2, 5, 1, 7, 4, 8, 3, 8]));
