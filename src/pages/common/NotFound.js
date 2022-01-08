import React from 'react'

function NotFound({ history }) {
    return (
        <div>
            <h2>404</h2>
            <button onClick={function(){
                history.push('/login')
            }}>返回登录界面</button>
        </div>
    )
}
export default NotFound
