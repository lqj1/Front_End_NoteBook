/**
 * JSONP原理：
 *  1.<script>标签不受同源政策影响，可以跨域根据scr的地址请求资源
 *  2.1 用<sctipt>标签请求到的是javascript代码，相当于浏览器直接请求到了这段代码并且执行。服务器向客户端jsonp传参就是在返回的javasctipt代码的函数中传参，类似jsonpCallBack({data:'ddddd'})。
 *  2.2 succuss: jsonpCallBack在发送请求前被声明，会拿到服务器返回的参数，调用success(data),将参数传给success
 *  ​2.3 error：由于没有使用XMLHttpRequest，所以无法根据服务器返回状态调用error——>设置超时定时器，如果一段时间内没有调用jsonpCallBack成功调用success说明超时、请求错误
 */

/**
 * 要点：
  1. 创建script标签
  2. 前端一个全局函数
  3. 服务端返回前端全局函数的调用
 */
function jsonp (url) {
  /*声明一个唯一的回调函数并挂载到全局上
   *创建一个script标签地址 指向 请求服务器 将回调函数名作参数带到服务器
   *服务器拿到回调名称 并返回前端 该回调的调用 把返回结果当作参数传入
   */
  let script = document.createElement('script')
  let uniqueName = `jsonpCallback${new Date().getTime()}`
  script.src = `url${url.indexof('?') > -1 ? '&' : '?'}callback=${uniqueName}`
  document.body.appendChild(script)
  window[uniqueName] = (res) => {
    cb && cb(res)
    document.body.removeChild(script)
    delete window[uniqueName]
  }
}
// 调用
jsonp('getList', (res) => {
  console.log(res);
})

// 服务器端
// 1. 获取参数, 拿到回调函数名称
// 2. 返回参数名的前端回调的调用 并 把要返回的参数作为实参调用

// /*弊端 - 只支持get请求,并且不安全,需要服务器支持*/

/**
 * Promise版本实现
 */
function jsonp ({url, query}) {
  let script = document.createElement("script");
  // 取唯一名字的回调函数
  let cb = `jsonpCallBack${new Date().getTime()}${Math.floor(Math.random(5)*100000)}`
  let params = {...query, cb}  // {name: 'ys', age: 19, cb: 'jsonpCallBack165960755285662552'}
  let arr = []
  for (let key in params) {
    arr.push(`${key}=${params[key]}`)
  }
  // arr = ['name=ys', 'age=19', 'cb=jsonpCallBack165960759038786593']
  script.src = `${url}?${arr.join("&")}`
  document.body.appendChild(script)
  
  return new Promise((resolve, rej) => {
    window[cb] = function (res) {
      resolve(res)
      document.body.removeChild(script)
      delete window[cb]
    }
  })
}
jsonp({
  url:'/getList',
  query: {name: 'ys',age: 19}
}).then((res) => {
  console.log(res)
})
