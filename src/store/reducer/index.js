/**
 * @author ms.wu
 * @time 2022-01-06 9:22 AM
 * @description 用于集成所有reducer并合并并导出一个reducer
 */

import { combineReducers } from "redux"

import common from './common'

export default combineReducers({
    common
})