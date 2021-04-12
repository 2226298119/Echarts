// 读取文件的工具方法
const fs = require('fs')
module.exports.getFileJsonData = (filePath) => {
  // 根据文件的路径, 读取文件的内容
  //将data通过promise传给调用者
  return new Promise((resolve, reject) => {
    //三个参数 
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if(error) {
        // 读取文件失败
        reject(error)
      } else {
        // 读取文件成功
        resolve(data)
      }
    })
  })
}