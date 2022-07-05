{/**
<div id='xxx'>
</div>
*/}

// clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。客户区指的是当前浏览器窗口可视区域。
// clientY 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（客户区）的垂直坐标。客户区指的是当前浏览器窗口可视区域。

// 拖拽状态
var dragging = false
// 记录位置
var position = null

// 鼠标按下
xxx.addEventListener('mousedown', function (e) {
  dragging = true
  position = [e.clientX, e.clientY]
})
// 移动鼠标的过程
document.addEventListener('mousemove', function (e) {
  if (dragging === false) {
    return null
  }
  const x = e.clientX
  const y = e.clientY
  const deltaX = x - position[0]
  const deltaY = y - position[1]
  const left = parseInt(xxx.style.left || 0)
  const top = parseInt(xxx.style.top || 0)
  xxx.style.left = left + deltaX + 'px'
  xxx.style.top = top + deltaY + 'px'
  position = [x,y]
})
// 鼠标抬起
document.addEventListener('mouseup', function (e) {
  dragging = false
})