import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { redirect } from 'react-router-dom'
import axios from 'axios'

function Authorization() {
    const [token, setToken, removeToken] = useCookies('token')
    const url = "http://localhost:8000/api/user/info"

    useEffect(() => { 
      const setLocalParams = async () => {
        const urlParams = new URLSearchParams(window.location.search)
        const tkn = urlParams.get('token')
  
        if(token){
            console.log(token)
        }
  
        if(tkn){
            setToken('token', tkn)
        }
  
        const res = await axios.get(url, {
          headers:{
            'Authorization': 'Bearer ' + tkn
          }
        })
        
        sessionStorage.setItem('username', res.data.username)
        sessionStorage.setItem('avatar', res.data.avatar)
        return redirect("/")
      };
      setLocalParams();
    }, [])


  return (
    <div>Authorization</div>
  )
}

export default Authorization