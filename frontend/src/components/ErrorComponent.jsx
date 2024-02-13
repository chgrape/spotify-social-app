import React, { useEffect, useState } from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorComponent() {
  const error = useRouteError()
  const [errorMsg, setErrorMsg] = useState("");
    useEffect(() =>{
        if(error.status == 404) {
            setErrorMsg("404: Page doesn't exist");
          }else if (error.status == 401){
            setErrorMsg("401: Unauthenticated")
          }else if(error.status == 500){
            setErrorMsg("500: Resource doesn't exist");
          }
    }, [])
  
  return (
    <div className='w-full h-screen flex justify-center items-center text-5xl'>{errorMsg}</div>
  )
}

export default ErrorComponent