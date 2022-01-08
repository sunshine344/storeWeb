import React,{ useCallback } from 'react'
import { CLEAR_DATE } from '../../store/type'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function Home({ dispatch,history }) {
    // 退出系统方法
    const loginOut = useCallback(function(){
        dispatch({type:CLEAR_DATE})
        history.push('/login')
    },[])
    return (
        <div>
            home page.
            <p>
                <button onClick={loginOut}>退出系统</button>
            </p>
        </div>
    )
}
export default connect()(withRouter(Home))
