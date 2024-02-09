import { useEffect, useState } from "react"
import arrow from "../assets/chevron-down.svg"
import Avatar from "./Avatar"
import { requireAuth } from "../assets/utils"


function ProfilePill({user, avatar}) {
  const handleLogout = async () => {
    sessionStorage.clear()
    await requireAuth();
  }

  return (
    <>
    <div className='bg-neutral-700 hover:bg-neutral-600 rounded-full flex justify-between items-center flex-row p-2 pr-4 duration-150 ease-in-out ml-5'>
        <Avatar av={avatar} height={8} width={8} />
        <p className="max-sm:hidden font-medium text-sm ml-2 mr-4">{user}</p>
        <img className=" h-4 w-4" src={arrow}></img>
    </div>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default ProfilePill