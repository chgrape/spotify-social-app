import axios from "axios";
import { Cookies } from "react-cookie"
import { redirect } from "react-router-dom";

export async function requireAuth(){
    const cookies = new Cookies();

    let isLoggedIn = false;
    

    if(sessionStorage.getItem('username') && cookies.get('token')){
        isLoggedIn = true;
    }
    console.log(isLoggedIn)
    if(!isLoggedIn){
        throw redirect("/login")
    }
}