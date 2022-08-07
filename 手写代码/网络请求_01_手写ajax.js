/**
 * ajax指的是通过js的异步通信，从服务器获取xml文档从中提取数据，再更新网页的对应部分，而不用去刷新整个网页。
 * 创建ajax请求的步骤：
  1. 创建一个XMLRequest对象。
  2. 在这个对象上使用open方法创建一个http请求，open方法所需要的参数是请求的方法，请求的路径，是否异步和用户的认证信息。
  3. 在发起请求之前，可以为这个对象添加一些信息和监听函数，比如通过setRequestHeader方法来为请求添加头信息，还可以为这个额对象添加一个状态监听函数。
一个XMLHttpRequest对象一共有5个状态，当她的状态变化时，会触发onreadystatechange时间，可以通过设置监听函数，来处理请求成功之后的结果，当对象readyState变成4的是偶，代表服务器返回的数据接收完成，这个时候，可以通过判断请求的状态，如果状态时2**或者是304的话就代表返回正常，这个时候就可以通过response中的数据对页面进行更新。
 */
// 1. XMLHttpRequest的使用
var xhr = new XMLHttpRequest()
xhr.open('GET','get.php', true)
xhr.send()
// 该属性每次变化时触发
xhr.onreadystatechange = function () {
  // 若响应完成且请求成功
  if (xhr.readyState === 4 && xhr.status === 200) {
    // do something
  }
}
/** 
  发送请求：
  1. 建立XMLHttpRequest对象：var xhr = new XMLHttpRequest();
  2. .open初始化请求：request.open(方法名, URL, 是否异步);
  3. .send(data)发送数据：request.send(data);
 */

/**
  监听回复：
  1.服务器回复之后readystate变化，调用onreadystatechange
  ​2.根据readystate请求状态码，status服务器返回的响应状态。处理请求成功之后服务器返回的数据
 */


// 不考虑json的ajax
// ajax的使用方式：
ajax({
  url: 'test.php',  // 请求地址
  type: 'POST',  // 请求类型，默认"GET"，还可以是"POST"
  data: { 'b': '异步请求' },
  success: function (res) {  // 请求成功的回调函数
    console.log(JSON.parse(res));
  },
  error: function (error) { }  // 请求失败的回调函数
})

/**
  需求分析：
  根据type的不同发送不同请求，根据服务器返回的状态调用susccess请求成功，error请求失败函数
 */
function ajax (params) {
  let {
    method = 'GET',
    data = {},
    url,
    success = function () { },
    error = function () { }
  } = params
  // 1.创建对象
  let xhr = new XMLHttpRequest()
  // 2.创建http请求
  xhr.open(method, url, true)
  xhr.send(data)
  // 3.设置状态监听函数
  xhr.onreadystatechange = function () {  
    if (this.status >= 200 && this.status<300 || request.status === 304) {
      success(this.responseText,this.responseXML)
    } else {
      error(this.status)
    }
  }
}

/**
  功能完善：
  ​1.为保证服务器接收数据正确，如果数据类型为key1=val1&key2=val2时
    客户端所发送的数据都要经encodeURIComponent进行编码。
    ​ 也就是：1.1发送GET请求
      ​     1.2发送POST请求的Content-Type='application/x-www-form-urlencoded'时
            
  2.GET方法send(null),POST方法根据Content-Type的不同发送不同的数据数据类型
    本例中的Content-Type可为：application/json、application/x-www-form-urlencoded
 */

let TYPE_URLENCODED = 'application/x-www-form-urlencoded'
let TYPE_JSON = 'application/json'
function ajax (params) {
  let method = params.method.toUpperCase() || 'GET'
  let data = params.data || {}
  let url = params.url
  let success = params.success || function () { }
  let error = params.error || function () { }
  let contentType = params.contentType||'application/x-www-form-urlencoded'
  if (!url) {
    console.log('url can\'t be undefined')
    return
  }
  const xhr = new XMLHttpRequest()
  function urlEncodeFormat (data) {
    let encoded = []
    for (let key in data) {
      let unit = encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      encoded.push(unit)
    }
    return encoded.join('&')
  }
  if (method === 'GET') {
    data = urlEncodeFormat(data)
    let url = params.url + '?' + data
    request.open(method, url, true)
    request.send(null)
  } else if (method === 'POST') {
    request.open('POST', url, true)
    if (contentType === TYPE_URLENCODED) {
      data = urlEncodeFormat(data)
    } else if (contentType === TYPE_JSON) {
      data = JSON.stringify(data)
    }
    request.setRequestHeader('Content-Type', contentType)
    request.send(data)
  }
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status>=200 && request.status<300 || request.status === 304) {
        success(request.responseText,request.responseXML)
      } else {
        error(request.status)
      }
    }
  }
}

//使用示例
let baseURL='http://localhost:3333'
ajax({
    url:baseURL+'/getTest',
    method:'GET',
    data:{
        name:'get data',
        data:'gggg'
    },
    success:function (data) {
        console.log(data)
    },
    error:function (err) {
        console.log(err)
    }
})

ajax({
    url:baseURL+'/postTest',
    method:'POST',
    data:{
        name:'post data',
        data:'ppppppp'
    },
    success:function (data) {
        console.log(data)
    },
    error:function (err) {
        console.log(err)
    }
})

ajax({
    url:baseURL+'/postTest',
    method:'POST',
    contentType:'application/json',
    data:{
        name:'post data',
        data:'jjjjj'
    },
    success:function (data) {
        console.log(data)
    },
    error:function (err) {
        console.log(err)
    }
})
