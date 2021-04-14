import React from 'react'

import { getUser, removeUserToken } from './Utils/Common'

function Dashboard(props) {

    const user = getUser()
    
    const handleLogout = () => {
        removeUserToken()
        props.history.push('/login')
    }

    return (
        <div>
            Welcome {user.name}!<br />
            <input type='button' onClick={handleLogout} value='Logout' />
        </div>
    )
}

export default Dashboard