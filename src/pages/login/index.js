/**
 * @author ms.wu
 * @time 2022-01-06 9:22 AM
 * @description 登录页面功能实现
 */

import React,{ useCallback,useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { tokenAvt,userInfoAct } from '../../store/action/commonAct'
import './index.less'

import { loginApi, userInfoApi } from '../../apis/userApi'
import {MD5,AES,enc} from 'crypto-js'

import { Checkbox,Spin,message } from 'antd'

function Login({ history,dispatch }) {

    const [loginObj,setLoginObj] = useState({id:'',password:''}),
        [remeber,setRemeber] = useState(false),
        [loading,setLoading] = useState(false)

        useEffect(function() {
            // 获取localstorage中用户信息
            let cache = localStorage.getItem('login-info')
            if(!!cache){
                try {
                    // 如果存在，则进行解密
                    cache = JSON.parse(AES.decrypt(cache,'login-key').toString(enc.Utf8))
                    setLoginObj({id:cache.id,password:cache.password})
                    setRemeber(true)
                }catch {

                }
            }
        }, [])

    const loginEvt = useCallback(async function(){
        // 设置加载状态
        setLoading(true)
        let res = await loginApi({
            id:loginObj.id,
            password:MD5(loginObj.password).toString()
        })
        // console.log('res',res)
        // 如果登录失败
        if(res.data.code !== 200){
            message.error('用户登录失败，请重试！')
            // 设置加载状态消失
            setTimeout(function(){setLoading(false)})
            return
        }
        // token缓存数据
        dispatch(tokenAvt(res.data.data.token))

        // 获取用户信息
        let user = await userInfoApi(loginObj.id) 
        // console.log(user)
        // 用户数据缓存到localstorage
        dispatch(userInfoAct(user.data.data))
        setTimeout(function(){
            setLoading(false)
        })
        // 判断是否勾选记住密码
        if(remeber) {
            // 加密
            let str = AES.encrypt(JSON.stringify(loginObj),'login-key').toString()
            // 缓存
            localStorage.setItem('login-info',str)
        }else{
            localStorage.removeItem('login-info')
        }
        // 跳转到home页面
        history.push('/home')
    }
    ,[ loginObj,remeber ])


    return (
        <div className='login-box'>
            <div className='login-content'>
                <Spin spinning={loading} tip="Loading..." size="large">
                    <div className='left'></div>
                    <div className='right'>
                        <span className='title'>超市管理系统</span>
                        <span className='stitle'>用户登录</span>
                        <div>
                            <div className='input'>
                                <span>用户编码：</span>
                                <input value={loginObj.id  } 
                                onChange={function(event){
                                    // console.log(event.target.value)
                                    setLoginObj({...loginObj,id:event.target.value})
                                }}/>
                            </div>
                            <div className='input'>
                                <span>用户密码：</span>
                                <input type="password" value={loginObj.password} 
                                onChange={function(event){
                                    setLoginObj({...loginObj,password:event.target.value})
                                }} />
                            </div>
                            
                        </div>
                        <div>
                            <Checkbox checked={remeber} className='checkbox' 
                            onChange={function(evt){
                                // console.log(evt)
                                setRemeber(evt.target.checked)
                            }}>记住密码</Checkbox>
                        </div>
                        <div>
                            <button onClick={loginEvt} className='login-btn'>登录</button>
                        </div>
                    </div>
                </Spin>
            </div>
        </div>
    )
}
export default connect()(Login) 
