/**
 * @author ms.wu
 * @time 2022-01-07 9:16 AM
 * @description 封装用户数据接口
 */

import Ajax from "./Ajax";

/** 用户登录接口 */
export function loginApi(data) {
    return Ajax({
        url: '/user/login',
        method: 'POST',
        data
    })
}

// 用户基本信息获取接口
export function userInfoApi(id) {
    return Ajax({
        url:'/user/'+id,
    })
}