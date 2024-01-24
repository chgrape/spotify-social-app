import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { redirect } from 'react-router-dom'

function Authorization() {
    const [token, setToken, removeToken] = useCookies('token')

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const tkn = urlParams.get('token')

        if(token){
            console.log(token)
        }

        if(tkn){
            setToken('token', tkn)
        }
        
    }, [])


  return (
    <div>Authorization</div>
  )
}

export default Authorization