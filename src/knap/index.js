/**
 * 从数组arr中取出n个数和为m
 * 取第n个数：s( n-1, m-n )
 * 不取第n个数： s( n-1, m )
 *
 * 参考：https://blog.csdn.net/JANESTAR/article/details/52572488
 * @param {*} n
 * @param {*} m
 */
function sum(n, m) {
  if (n <= 0 || m <= 0) {
    return;
  }
  if (m === n) {
    console.log(sum.list.concat(n).join(','));
    return;
  }
  sum.list.push(n);
  sum(n - 1, m - n);
  sum.list.pop();
  sum(n - 1, m);
}
sum.list = [];

sum(6, 8);

/**
 * 0-1背包问题
 * b[k][c] => // 拿第k件物品背包剩余容量
 * b[k] > c // 第k件物品的重量大于背包剩余容量
 * ? b[k][c] = b[k-1][c] // 第k件物品拿不动
 * : max( b[k-1][c-w[k]] + v[k], b[k-1][c] )
 * // 拿第k件物品，背包容量要减去w[k],价值要加v[k]，
 * // 不拿第k件物品，总价值等于拿第k-1件物品的最大价值
 *
 * 参考：http://new-play.tudou.com/v/448118973.html?f=38184740
 */

let b = [];
function knap(n, m) {
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (!b[i]) {
        b[i] = [];
      }
      b[i][j] = 0
    }
  }
  const w = [ 0, 2, 3, 4, 5, 9 ];
  const v = [ 0, 3, 4, 5, 8, 10 ];
  for (let k = 1; k <= n; k++) {
    for (let c = 1; c <= m; c++) {
      if (w[k] > c) {
        b[k][c] = b[k - 1][c];
      } else {
        b[k][c] = Math.max(b[k - 1][c - w[k]] + v[k], b[k - 1][c]);
      }
    }
  }
}
var [n, m] = [5, 20];
knap(n, m);
console.log(b[n][m]);
