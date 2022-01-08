/**
 * @author ms.wu
 * @time 2022-01-06 10:11 AM
 * @description 定义项目的通用状态数据的action对象
 */
import { SET_TOKEN, SET_USER_INFO } from '../type'

// 定义获取设置token的action对象
export function tokenAvt(token) {
     return {type:SET_TOKEN,token}
}
// 定义获取设置用户信息的action对象
export function userInfoAct(userinfo) {
    return {type:SET_USER_INFO,userinfo}
}
// 定义一个异步action方法
export function asyncTokenAct() {
    return async function (dispatch) {
        let res = await ajax()
        return {type:'',token:res}
    }
    
}

// 模拟异步请求
function ajax() {
    return new Promise(resolve => {
        resolve() 
    })
}