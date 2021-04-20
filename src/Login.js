import React, { useState } from 'react'
import axios from 'axios'

import { setUserSession, userSession } from './Utils/Common'

function Login(props) {
    const username = useFormInput('')
    const password = useFormInput('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        console.log('Click here!')
        setError(null)
        setLoading(true)
        axios.post('http://192.168.1.19:4000/users/signin', { username: username.value, password: password.value }).then(response => {
            setLoading(false)
            setUserSession(response.data.token, response.data.user)
            props.history.push('/dashboard')
        }).catch(error => {
            setLoading(false)
            if(error.response.status === 401) setError(error.response.data.message)
            else setError('Error! Somthing is not Working')
        })
    }

    return (
        <div>
            Login<br />
            <div>
            UserName: <br />
            <input type='text' {...username} autoComplete='new-password' />
            </div>
            <div>
            Password: <br></br>
            <input type='password' {...password} autoComplete='new-password' />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /> </>} <br />
            <input type='button' value={ loading ? 'Loading...' : 'Login' } onClick={handleLogin} disabled={loading} /><br/>
        </div>
    )
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue)

    const handleChange = e => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}



export default Login