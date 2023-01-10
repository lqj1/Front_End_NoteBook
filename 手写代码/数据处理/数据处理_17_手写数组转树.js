/**
例如
[{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]
把这个数组从顶级分类递归查找子分类，最终构建一个树状数组。结果输出如下
[{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]
parentId为0 的是根节点
 */
var list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
function convert(list) {
  const map = list.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
  const result = []
  // 遍历每一条数据
  for (const key in map) {
    const item = map[key]
    // 遇到没有父节点的节点，直接 push 到 result
    if (item.parentId === 0 || item.parentId === null) {
      result.push(item)
    } else {
      // 获取当前元素的父节点
      const parent = map[item.parentId]
      // 如果其父节点存在，将当前节点push到父元素的 children 集合中
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
  }
  return result
}
var result = convert(list)