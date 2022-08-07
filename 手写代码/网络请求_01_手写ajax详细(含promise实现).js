/**
实现AJAX请求的步骤：
  1. 创建 XMLHttpRequest 对象
  2. 设置状态监听函数
  3. 规定请求的类型、URL 以及是否异步处理请求
  4. 将请求发送到服务器
 */

/**
  1.简介
    AJAX是异步的JavaScript和XML（Asynchronous JavaScript And XML）。
    简单点说，就是使用 XMLHttpRequest 对象与服务器通信。
  2.AJAX最主要的两个特性：
    在不重新加载页面的情况下发送请求给服务器
    接受并使用从服务器发来的数据
 */

// 1. 创建 XMLHttpRequest 对象
var xhr = new XMLHttpRequest()
// 2. 设置状态监听函数
xhr.onreadystatechange = function () {  // 状态发生变化，触发回调函数
  if (xhr.readyState !== 4) {
    return
  }
  if (xhr.status === 200) {
    // 成功，从服务器获取数据，通过 responseText 拿到响应的文本
    console.log(xhr.responseText);
    // do what
  } else {
    // 失败，根据响应码判断失败原因
    new Error(xhr.statusText)
  }
}
// 3. 规定请求的类型，URL以及是否异步处理请求
xhr.open('GET',url,true)  // 第三个参数，async：true（异步）或 false（同步），默认值为true
// 4. 将请求发送到服务器
xhr.send()

// 如果需要像获取 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。
// 然后在 send() 方法中规定您希望发送的数据：
xhr.open('POST', url, true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr.send('fname=test&age=18')  // 如果需要对其加密，可以看另一个手写ajax中的版本

// 设置状态监听函数
// 当请求被发送到服务器时，我们需要执行一些基于响应的任务，处理服务器响应。
// ◾ readyState - 存有 XMLHttpRequest 的状态。请求状态 从 0 到 4 发生变化。
// 0: 请求未初始化
// 1: 服务器连接已建立
// 2: 请求已接收
// 3: 请求处理中
// 4: 请求已完成，且响应已就绪
// ◾ status - HTTP响应码
// 200: “OK”
// 404: 未找到页面

/**
 * 使用Promise封装AJAX
 */
function ajax_promise (method, url, data) {
  var xhr = new XMLHttpRequest()
  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.open(method, url)
    xhr.send(data)
  })
}

// 使用
ajax('GET', '/api/categories').then(function (data) {
  // AJAX成功，拿到响应数据
  console.log(data);
}).catch(function (status) {
  // AJAX失败，根据响应码判断失败原因
  new Error(status)
});