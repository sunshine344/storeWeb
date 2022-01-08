# store-web 邻家超市管理系统 v.0.1.0

### 项目依赖
```
1、NodeJS v.14.x +
2、create-react-app v.5.x
3、React v17.x
```

### 运行
```
1、安装依赖：npm install/yarn install
2、运行：npm start/yarn start
3、发布打包：npm run build
```

### 架构
```
|—— store-web
    |—— package.json
    |—— README.md
    └── public
        |—— index.html
        |—— favicon.ico
    |—— src
        |—— main.js                   // 项目的实例入口 new Vue().$mount(domNode)
        |—— views                     // 项目页面组件模块
            |—— index.vue             // 项目的路由管理文件 router-view
            |—— home                  // 功能模块
            ...
        |—— store                     // 全局状态数据管理模块
            |—— index.js              // 实现状态数据管理对象定义以及导出
            |—— action                // 定义action和type对象
            |—— reducer               // 定义reducer模块
        |—— style                     // 样式管理
            |—— common.less           // 通用变量、方法
            |—— index.less            // 通用样式
        |—— images                    // 项目的图片模块
        |—— apis                      // 项目的数据交互接口
            |—— Ajax.js               // 实现项目的异步请求库封装
            |—— xxxApi.js             // 项目功能的api接口定义
        |—— components                // 实现项目的自定义组件
            |—— xxxx.js               // 实现具体业务、功能组件
```