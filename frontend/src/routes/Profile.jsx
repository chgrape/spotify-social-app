import React, { useEffect, useState } from "react";
import Stat from "../components/Stat";
import { Cookies } from "react-cookie";
import axios from 'axios'

function Profile() {
  const [posts, setPosts] = useState([])
  const url = 'http://localhost:8000/api/posts'
  const cookies = new Cookies()

  useEffect(() => { 
  const fetchPosts = async () => {
    const data = await axios.get(url, {
      headers:{
        'Authorization' : 'Bearer ' + cookies.get('token'),
        'Accept' : '*/*'
      }
    })
    console.log(data)
  }
  fetchPosts().catch(console.error)

}, [])


  return (
    <div className=" pt-32 flex justify-center">
      <header className="mx-auto w-[52rem] justify-center flex">
        <div className="w-[30rem]">
          <h1 className="text-5xl font-semibold my-3">Username</h1>
          <p>link to profile</p>
          <aside className="my-5 flex flex-row ">
            <Stat statName="Likes" amount="3" />
            <Stat statName="Groups" amount="2" />
            <Stat statName="Posts" amount="1" />
          </aside>
        </div>
        <div className="h-36 w-36 rounded-full bg-neutral-300" />
      </header>
      {}
    </div>
  );
}

export default Profile;
