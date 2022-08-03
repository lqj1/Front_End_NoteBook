/**
 * 1. 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
 * 2. 节流可以使用在 scroll 函数的事件监听上，通过事件节流来[降低事件调用的频率]。
 * 3. 在连续执行时间时，使事件在相同时间间隔内执行
 * 4. 场景：
 *    scroll滚动事件，每隔特定描述执行回调函数
 *    input输入框，每个特定时间发送请求或是展开下拉列表，（防抖也可以）
 */


// 方法1：定时器
// 1. 根据 setTimeout，延迟 func 执行时间为 delay
// 2. 每次执行完后清除 timer，如果timer存在，则不执行，
/**
 * 该方法与防抖的区别在于，防抖每次马上清除掉上一次的timer，不管有没有执行，只执行最后一次
 * 而节流在timer存在时不执行，等到方法执行完毕后再清除timer
 */
function throttle (func, delay) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    if (timer) {
      return
    } else {
      timer = setTimeout(() => {
        func.call(context, args)
      }, delay);
    }
  }
}

// 方法2(推荐)：根据时间间隔发，记录上一次执行的时间
// 用当前时间减去上一次的时间，如果大于设置的delay，那么执行 func，并且刷新上一次的时间为now
function throttle (func, delay) {
  let pre = 0
  return function () {
    let now = new Date()
    let context = this
    let args = arguments
    if (now - pre > delay) {
      func.apply(context, arguments)
      pre = now
    }
  }
}

function throttle (func, delay) {
  let pre = 0
  return function () {
    let now = new Date()
    let context = this
    let args = arguments
    if (now - pre > delay) {
      func.apply(context, arguments)
      pre = now
    }
  }
}