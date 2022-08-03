/**
 * flat，es6方法，将多层数组展开为一层，depth表示展开深度
 * 使用 递归方法 实现
 */
function _flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur, depth-1))
    } else {
      return prev.concat(cur)
    }
  },[])
}

// 简写
function _flat (arr, depth) {
  if (!Array.isArray(arr) || depth <=0) {
    return arr
  } 
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      return prev.concat(_flat(cur,depth-1))
    } else {
      return prev.concat(cur)
    }
  },[])
}