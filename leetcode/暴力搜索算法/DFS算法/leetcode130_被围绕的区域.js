/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

/**
 * 
  一、思路
    关键理解题意
    将与边界O不相连的内部O全部替换成 X
    1、将边界O找出添加标识不能被替换
    2、通过DFS对边界O操作，将相连的O同样标识为不能被替换
    3、最后遍历，将非标识的O替换成题意X
  二、边界条件
    最上、下或最左、右，且是O的
  三、技巧
    DFS中，已经被置为不能访问标识的无需再DFS
    最后遍历中，无需再遍历边界条件
 */

var solve = function(board) {
  let row = board.length;
  if (row == 0) {
    return
  }
  let col = board[0].length
  let not_allow = {}
  // 定义 dfs 函数
  let dfs = (i, j) => {
    // 越界、标识过不允许或者非相连字母O就直接return
    if (i < 0 || j < 0 || i == row || j == col || board[i][j] != 'O' || not_allow[i+'-'+j]) {
      return
    }
    // 当前为 O,且标识 not_allow 为 false,更改为 true
    not_allow[i + '-' + j] = true
    dfs(i-1,j)  // 向上
    dfs(i+1,j)  // 向下
    dfs(i,j-1)  // 向左
    dfs(i,j+1)  // 向右
    
  }
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      // 从边缘O出发寻找相连点标识为不可替换
      if ((i == 0 || j == 0 || i == row - 1 || j == col - 1) && board[i][j] == 'O') {
        dfs(i, j)
      }
    }
  }
  // 最后遍历，将非标识的O替换成题意X
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!not_allow[i][j] && board[i][j]=='O') {
        board[i][j] = 'X'
      }
    }
  }
};