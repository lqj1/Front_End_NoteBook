// 1.创建koa对象
const Koa = require('koa')
const app = new Koa()
// 2.编写响应函数(中间件)
// ctx:上下文,web容器,ctx.request ctx.response
// next: 下一个中间件,下一层中间件是否能够得到执行, 取决于next这个函数有没有被调用
app.use((ctx, next) => {
  console.log('第一层中间件...1')
  ctx.response.body = 'hello world'
  next()
  console.log('第一层中间件...2')
})
// 第二层中间件
app.use(async (ctx, next) => {
  console.log('第二层中间件...1')
  const ret = await next()
  console.log(ret)
  console.log('第二层中间件...2')
})
// 第三层中间件
app.use((ctx, next) => {
  console.log('第三层中间件')
  return 'i love the dog'
})
// 3.绑定端口号 3000
app.listen(3000)