/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
 var combine = function(n, k) {
  let res = []
  let cur = []

  backtrack(n, k, 1)
  return res

  function backtrack (n, k, start) {
    if (cur.length == k) {
      res.push([...cur])
    }
    for (let i = start; i <= n; i++) {
      cur.push(i)
      backtrack(n, k, i + 1)
      cur.pop()
    }
  }
};