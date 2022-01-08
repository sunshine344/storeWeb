/**
 * @author ms.wu
 * @time 2022-01-06 9:22 AM
 * @description 接受一个reducer,创建store对象，集成插件
 */

import {  createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import RootReducer from './reducer'

// 对store进行插件注入
export default createStore(RootReducer,applyMiddleware(thunk))