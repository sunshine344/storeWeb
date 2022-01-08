/**
 * @author ms.wu
 * @time 2022-01-07 9:16 AM
 * @description 实现axios请求封装，实现拦截和通用数据封装
 */
import axios from 'axios'
import store  from '../store'
import { message } from 'antd'

const Ajax = axios.create({
    // 配置请求的超时时间
    timeout: 5000,
    // 基础路由地址
    // baseURL: 'http://www.shuiyue.info:12600'
    baseURL: '/apis'
})

// 实现请求拦截
Ajax.interceptors.request.use(config => {
    // 实现数据请求用户访问权限拦截
    // 如果需要有一定的权限才能访问的接口，需要拦截
    let paths = ['/user/login']

    // 判断是否需要进行拦截
    if (paths.includes(config.url)) {
        return config
    } else {
        let token = store.getState().common.token

        // 如果用户没有登录，是不能访问接口的
        if (!token) {
            return Promise.reject({code: 0, message: '用户没有登录，不能访问接口'})
        } else {
            config.headers.token = store.getState().common.token
            return config
        }
    }
})

// 响应拦截
Ajax.interceptors.response.use(response => {
    if (!!response.data && response.data.code === 403) {
        message.error('您的票据失效了，请重新登录')
        throw new Error('票据失效')
    } else {
        return response
    }
})

// 实现传递数据和请求方法的拦截
/**
 * 异步请求封装方法
 * @param {{url:string,data:any,method:'POST'| 'GET' | 'DELETE' | 'PUT',params:any}} req 
 * @returns 
 */
export default function(req) {
    // 判断是否有传递路由过来(url)
    if(!req.url) throw new Error('请求方法，url必传')
    
    return new Promise(resolve=>{
        // 发起请求
        Ajax.request({
            url:req.url,
            method:req.method||'GET',
            // data：几乎除get外的所有方法，都应该用请求体发送数据
            data:req.data || {},
            params:req.params || {},
        }).then(function(data){
            // 对返回对象(response)进行解构
            resolve(data)
        }).catch(function(e){
            resolve(e)
        })

    })
}