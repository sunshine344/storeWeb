import React from 'react'

function NotRight( {history} ) {
    return (
        <div>
            <h2>403</h2>
            <button onClick={
                function(){
                    history.push('/login')
                }
            }></button>
        </div>
    )
}
export default NotRight
