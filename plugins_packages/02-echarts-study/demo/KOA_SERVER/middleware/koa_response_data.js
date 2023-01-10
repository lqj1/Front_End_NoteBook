// 处理业务逻辑的中间件，读取某个json文件的数据
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
  // 根据url来进行文件读取
  const url = ctx.request.url //  端口号之后的路径  /api/seller -> 请求路径：data/seller.json
  let filePath = url.replace('/api', '') //  /api/seller -> /seller
  filePath = '../data' + filePath + '.json' // ../data/seller.json
  filePath = path.join(__dirname, filePath) // 将当前路径和转化的路径拼接
  try {
    const ret = await fileUtils.getFileJsonData(filePath)
    ctx.response.body = ret
  } catch (error) {
    const errorMsg = {
      message: '读取文件内容失败，文件资源不存在',
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }

  console.log(filePath)
  await next() // 虽然是最后一层，一般也需要写上next()
}