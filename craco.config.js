/**
 * @author ms.wu
 * @create 2022-01-06 9:14 AM
 * @description 配置文件
 */
const CracoLessPlugin = require("craco-less")

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],

  // 通用的一个配置方法
  // devServer: {
  //     open: true,
  //     port: 9666,
  //     proxy: {
  //         '/apis': {
  //             target: 'http://www.shuiyue.info:12600',
  //             pathRewrite: {'/apis': ''}
  //         }
  //     }
  // }
}

