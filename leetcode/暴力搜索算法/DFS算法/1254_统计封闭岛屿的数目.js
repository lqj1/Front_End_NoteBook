/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
  let res = 0;
  let row = grid.length, col = grid[0].length;
  // 将左右的岛屿变成海，淹了
  for (let i = 0; i < row; i++) {
    // 将靠左边的岛屿淹掉
    dfs(grid, i, 0)
    // 将靠右边的岛屿淹掉
    dfs(grid, i, col-1)
  }
  // 将上下的岛屿变成海，淹了
  for (let j = 0; j < col; j++) {
    // 将靠上边的岛屿淹掉
    dfs(grid, 0, j)
    // 将靠下边的岛屿淹掉
    dfs(grid, row -1, j)
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j]=='0') {
        // 遇到陆地(O)，新发现一座岛屿
        res++
        // 将陆地变成海
        dfs(grid, i, j)
      }
    }
  }
  return res
  function dfs (grid, i, j) {
    let row = grid.length, col = grid[0].length;
    if (i < 0 || j < 0 || i >= row || j >= col) {
      // 超出索引
      return 
    }
    if (grid[i][j] == '1') {
      // 此处已经是海水
      return
    }
    // 将此处变为海水
    grid[i][j] = '1'
    dfs(grid, i - 1, j)
    dfs(grid, i + 1, j)
    dfs(grid, i, j - 1)
    dfs(grid, i, j + 1)
  }
};