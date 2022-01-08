/**
 * @author ms.wu
 * @time 2022-01-06 9:22 AM
 * @description 组件入口--路由
 */
import React from 'react'
import loadable from 'react-loadable'
import { connect } from 'react-redux'
// 路由模式
// import { HashRouter as Router,Switch,Route } from 'react-router-dom'
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom'
import { Spin  } from 'antd'
// 引入项目页面组件
const Login = myLoader(() => import('./login'))
const Home = myLoader(()=> import('./home')) 
const NotFound = myLoader(()=> import('./common/NotFound')) 
const NotRight = myLoader(()=> import('./common/NotRight')) 

// react懒加载
function myLoader(loader) {
    return loadable({
        loader,
        loading: function(){
            return (
                <div style={{padding:'10vh 0 0',textAlign:"center"}}>
                    <Spin  size="large"></Spin>
                </div>
            )
        }
    })
}

function App({ token }) {
    // 定义一个权限拦截的方法
    // 拦截用户是否登录过 token数据,返回true/false
    function hasLogin() {
        return !!token
    }
    return (
        <Router>
            <Switch>
                <Route path="/404" component={NotFound} />
                <Route path="/login" component={Login}/>

                <Route path="/home" render={
                    function(routeDate){
                        // console.log(arguments)
                        return hasLogin() ? <Home/> : <NotRight {...routeDate}/>
                    }
                }/>
                {/* 默认路由重定向 */}
                <Redirect path="/" to="/login" exact />
                {/* 如果路由错误，直接重定向到404页面 */}
                <Redirect to="/404"/>
            </Switch>
        </Router>
    )
}

const mapStateToProps = function(state) {
    return {
        token:state.common.token,
        // userInfo:state.common.userInfo
    }
}
const hoc = connect(mapStateToProps)

export default hoc(App)