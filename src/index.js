/**
 * @author ms.wu
 * @time 2022-01-06 9:12 AM
 * @description 项目的入口，实现虚拟组件挂载到真实dom，状态管理器挂载
 */
import React from 'react'
import { render } from 'react-dom'

import App from './pages'

import './style/index.less'

// react 三大原则：单一数据源，state只读，reducer必须为纯函数
// store中有三个函数：getState(获取state数据),dispatch(调用一个动作去更新state数据react),subscribe(订阅state数据更新消息)

import store from './store'

import { Provider } from 'react-redux'

render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
)