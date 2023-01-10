// 问： 如何串行执行多个Promise
// 使用Array.prototype.reduce、使用async + 循环 + await、 或者使用新出的for await of

function delay (time) {
  return new Promise((resolve, reject) => {
    console.log(`wait ${time}s`)
    setTimeout(() => {
      console.log('execute');
      resolve()
    }, time*1000);
  })
}
const arr = [3, 4, 5]

// 一个封装的延迟函数，然后一个装有3,4,5的数组，
// 需求就是在开始执行时依次等待3, 4, 5秒，并在之后打印对应输出
/**
wait 3s // 等待3s，之后执行
execute
wait 4s // 从上次执行之后，等待4s，再执行
execute
wait 5s // 从上次执行之后，等待5s，再执行
execute
 */

// 方式1: reduce
arr.reduce((pre, cur) => {
  return pre.then(()=>delay(cur))
}, Promise.resolve())

// 方式2: async + 循环 + await
(
  async function () {
    for (const v of arr) {
      await delay(v)
    }
  }
)()

// 方式3: 普通循环
// 其实仔细想想方式1的本质是使用一个中间变量（上一次执行结果）来保存链式Promise, 
// 那我们举一反三， 换别的循环也可以实现
let p = Promise.resolve()
for (const i of arr) {
  p = p.then(()=>delay(i))
}

// 方式4: 递归
function dispatch (i, p = Promise.resolve()) {
  if (!arr[i]) {
    return Promise.resolve()
  }
  return p.then(()=>dispatch(i+1, delay(arr[i])))
}
dispatch(0)

// 方式5: for await of
// 通过查阅了for await of的规则，其实for await of和for of规则类似，
// 只需要实现一个内部[Symbol.asyncIterator]方法即可
function createAsyncIterable (arr) {
  return {
    [Symbol.asyncIterator] () {
      return {
        i: 0,
        next () {
          if (this.i < arr.length) {
            return delay(arr[this.i]).then(()=>({value:this.i++,done:false}))
          }
          return Promise.resolve({done: true})
        }
      }
    }
  }
}

// 先创建出一个可异步迭代对象，然后丢到for await of循环即可
(async function () {
  for await (i of createAsyncIterable(arr)) { }
})()


// 方式6: generator
// 先创建一个generator函数，然后再封装一个自执行run函数
function* gen () {
  for (const v of arr) {
    yield delay(v)
  }
}
function run (gen) {
  const g = gen()
  function next (data) {
    const result = g.next(data)
    if (result.done) {
      return result.value
    }
    result.value.then(function (data) {
      next(data)
    })
  }
  next()
}
run(gen)
