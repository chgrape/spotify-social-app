import { useEffect, useRef, useState } from "react"
import arrow from "../assets/chevron-down.svg"
import Avatar from "./Avatar"
import { Cookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import useClickOutside from "../assets/useClickOutside"


function ProfilePill({user, avatar}) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const logoutButton = useRef(null)
  useClickOutside(logoutButton, ()=> setIsOpen(false))

  const handleLogout = async (e) => {
    e.preventDefault()
    axios.get('http://localhost:8000/api/logout', {
      headers:{
        Authorization: "Bearer " + cookies.get('token')
      }
    })
    sessionStorage.clear()
    cookies.remove('token')
    window.dispatchEvent(new Event('storage'))
    navigate("/login")
  }


  return (
    <>
    <div onClick={() => setIsOpen(true)} className='bg-neutral-700 hover:bg-neutral-600 rounded-full flex justify-between items-center flex-row p-2 pr-4 duration-150 ease-in-out ml-5'>
        <Avatar av={avatar} height={8} width={8} />
        <p className="max-sm:hidden font-medium text-sm ml-2 mr-4">{user}</p>
        <img className=" h-4 w-4" src={arrow}></img>
        
    </div>
    {isOpen && <div ref={logoutButton} className="bg-neutral-700 z-10 absolute font-bold rounded-lg text-sm w-40 text-neutral-400 border-neutral-600 p-3 mt-32 drop-shadow-lg hover:bg-neutral-600 duration-150">
        <button className="w-full flex" onClick={handleLogout}>Log out</button>
        </div>}
    </>
  )
}

export default ProfilePill