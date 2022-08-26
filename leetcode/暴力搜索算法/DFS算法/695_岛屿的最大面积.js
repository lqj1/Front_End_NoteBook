/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  let res = 0
  let row = grid.length, col = grid[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] == '1') {
        res = Math.max(dfs(grid, i, j), res)
      }
    }
  }
  return res

  function dfs (grid, i, j) {
    let row = grid.length, col = grid[0].length;
    if (i < 0 || j < 0 || i >= row || j >= col) {
      return 0;   // 这里需要返回0，不然相加结果为 NaN
    }
    if (grid[i][j] == '0') {
      return 0;   // 这里需要返回0，不然相加结果为 NaN
    }
    grid[i][j] = '0'
    return dfs(grid, i, j - 1)
         + dfs(grid, i, j + 1)
         + dfs(grid, i - 1, j)
         + dfs(grid, i + 1, j) + 1
  }
};