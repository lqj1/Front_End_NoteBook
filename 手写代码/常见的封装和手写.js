// 1、红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
function light (value, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value)
      resolve()
    }, time);
  })
}
// 将时间放在promise中，然后输出放在异步执行之后，确保不会随机时间
let step = () => {
  Promise.resolve().then(() => {
    return light('red', 3000)
  }).then(() => {
    return light('green', 1000)
  }).then(() => {
    return light('yellow', 2000)
  }).then(() => {
    step()
  })
}

step()

// 用Promise封装一秒后打印Hello World
function printSomething(arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('printSomething: ', arg)
      resolve(arg)
    }, 1000);
  })
}
printSomething('hello world').then(res => {
  console.log('printSomething response: ', res)
})

// 2、async和await把异步改为同步，得到最新的state的值
// - 使用Promise来封装setState(异步编程)

changeCount = (state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.setState(state)
      resolve(this.state.count)
    }, 100);
  })
}
pushRouter = async() => {
  // await this.setState({
  //   count: this.state.count + 1
  // })
  // 更改为：
  const result = await this.changeCount({
    count: this.state.count + 1
  })
}

// 3、async，await结合try，catch使用捕获异常