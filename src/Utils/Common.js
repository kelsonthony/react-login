// return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user')
    if(userStr) return JSON.parse(userStr)
    else return null
}

//return the toke from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null
}

//remove the token adn user from the session storage
export const removeUserToken = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('use')
}

//set the token and user from the session storage
export const setUserSession = () => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('user', JSON.stringify(user))
}
