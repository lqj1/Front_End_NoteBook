/**
 * 1. 防抖函数是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时
 * 2. 这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求
 * 3. 实现思路：设置一个公共的定时器，每次触发事件时，先清除该定时器，然后再生成一个，这样只会有最后一个定时器触发
 * 4. 场景：
 *    登录，发短信等按钮避免发送多次请求
 *    文本编辑器实时保存
 */

const btn = document.getElementById('btn')
btn.addEventListener('click', debounce(payMoney, 1000))
function payMoney(a) {
  console.log(a)
}

function debounce (func, wait) {
  let timer = null
  return function () {
    const context = this
    const args = arguments 
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
}

