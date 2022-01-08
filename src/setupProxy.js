/**
 * @author ms.wu
 * @time 2022-01-07 10:10 AM
 * @description 实现代理
 */
 const { createProxyMiddleware } = require('http-proxy-middleware')

 // 加载当前文件的库，应该要给一个app实例过来 -> 应该使用一个方法、函数
 module.exports = function(app) {
     app.use(
         '/apis',
         createProxyMiddleware({
             target: 'http://www.shuiyue.info:12600',
             changeOrigin: true,
             pathRewrite: {'/apis': ''}
         })
     )
 }