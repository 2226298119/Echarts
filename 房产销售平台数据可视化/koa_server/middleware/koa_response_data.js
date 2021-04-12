/**
 * 第三层中间件
 * 读取文件内容
 *    获取请求的路径，拼接文件的路径
 *    读取该路径对应文件的内容
 * 设置响应体
 */
// 处理业务逻辑的中间件,读取某个json文件的数据
const path = require('path')
//导入读取文件的工具类
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
  // 根据url 来读取对应的文件 路径拼接
  const url = ctx.request.url //  url：  /api/seller   对应的文件路径：  ../data/seller.json
  let filePath = url.replace('/api', '') //  /seller 
  filePath = '../data' + filePath + '.json'  // ../data/seller.json
  //__dirname代表当前文件的绝对路径 
  filePath = path.join(__dirname, filePath)
  try {
    //await 用在异步函数，此时得到的不是promise对象，而是promise结果
    const ret = await fileUtils.getFileJsonData(filePath)
    //将得到的数据设置到响应体中
    ctx.response.body = ret
  } catch (error) {
    const errorMsg = {
      message: '读取文件内容失败, 文件资源不存在',
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }

  console.log(filePath)
  await next()
}