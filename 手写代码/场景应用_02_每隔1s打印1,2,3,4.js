/**
 * 闭包问题
 */

/**
 * 方法1：使用闭包实现
 */
for (var i = 1; i < 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, i*1000);
  })(i)
}

/**
 * 方法2：使用 es6 的let块级作用域
 */
for (let i = 1; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i*1000);
}
