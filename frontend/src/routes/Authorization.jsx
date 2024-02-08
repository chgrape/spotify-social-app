import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Authorization() {
    const [token, setToken, removeToken] = useCookies('token')
    const url = "http://localhost:8000/api/user/info"
    const navigate = useNavigate();

    useEffect(() => { 
      const setLocalParams = async () => {
        const urlParams = new URLSearchParams(window.location.search)
        const tkn = urlParams.get('token')
  
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
        navigate("/")
      };
      setLocalParams();
    }, [])


  return (
    <div>Authorization</div>
  )
}

export default Authorization