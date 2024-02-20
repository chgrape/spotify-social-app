import axios from "axios";
import { Cookies } from "react-cookie"
import { redirect } from "react-router-dom";

export async function requireAuth(){
    const cookies = new Cookies();
    
    const res = await axios.get('http://localhost:8000/api/auth/check', {
        headers:{
            Authorization: "Bearer " + cookies.get('token')
        }
    }).catch((e) =>{
        localStorage.clear()
        window.dispatchEvent(new Event('storage'))
        throw redirect("/login")
    })
}