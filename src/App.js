import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom'
import axios from 'axios'

import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'

import PrivateRoute from './Utils/PrivateRoute'
import PublicRoute from './Utils/PublicRoute'

import { getToken, removeUserToken, setUserSession } from './Utils/Common'

function App() {
  
  const [authLoading, setAuthLoading] = useState(true)

  useEffect( ()=> {
    const token = getToken()
    if(!token) {
      return
    }

    axios.get(`http://192.168.1.19:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user)
      setAuthLoading(false)
    }).catch(error => {
      removeUserToken()
      setAuthLoading(false)
    })
  }, [])

  if(authLoading && getToken()) {
    return <div className='content'>Checking Authentcation...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className='header'>
            <NavLink exact activeClassName='active' to='/'>Home</NavLink>
            <NavLink activeClassName='active' to='/login'>Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName='active' to='/dashboard'>Dashboard</NavLink><small>(Access with token )</small>
          </div> 
          <div className='content'>
          <Switch>
            <Route exact path='/' component={Home} />
            <PublicRoute path='/login' component={Login} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
          </div> 
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
