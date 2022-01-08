/**
 * @author ms.wu
 * @time 2022-01-06 9:34 AM
 * @description 定义项目通用状态数据
 */

import { SET_USER_INFO,SET_TOKEN,CLEAR_DATE } from '../type'

import { AES,enc } from 'crypto-js'

const CRYPT_KEY ='store-web-key'

// 在文件初始化时，会对redux中的数据进行重置，所以可以在这里获取当前缓存的数据
let cache = sessionStorage.getItem('redux-cache')

const myinit = {
    token:'',
    userInfo: {}
}
// 解密
// 如果用户首次进入系统，cache是一个null对象，不能进行解密
try {
    let myCache = AES.decrypt(cache,CRYPT_KEY).toString(enc.Utf8)
        // 处理解密的结果
        if(!!myCache) {
            // 对解密结果进行转换
            try {
                cache = JSON.parse(myCache) || myinit
            }catch {
                // json.parse错误
                cache = myinit
            }
        } else {
            cache = myinit
        }
    } catch {
        // 解密失败
        cache = myinit
}

const initState = {
    token: cache.token,
    userInfo: cache.userInfo
}

export default function reducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case SET_TOKEN:
            newState.token = action.token
            break
        case SET_USER_INFO:
            newState.userinfo = action.userinfo
            break
        case CLEAR_DATE:
            
        default:
            break
    }
    // 在数据缓存到store之前，存储到sessionStorage
    // sessionStorage.setItem('redux-cache',JSON.stringify(newState))
    // 使用对称加密，把缓存的数据进行加密，避免数据泄漏
    let myCache = AES.encrypt(JSON.stringify(newState),CRYPT_KEY).toString()
    sessionStorage.setItem('redux-cache',myCache)
    return newState
}