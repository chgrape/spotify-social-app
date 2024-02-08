import React from "react";
import max from "../assets/maximize.svg";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

function GroupCard({ theme, description, id, potential }) {
  const url = "http://localhost:8000/api/groups/";
  const cookies = new Cookies();
  const navigation = useNavigate();

  const handleJoin = async()=>{
    const res = await axios.patch(url + id, {}, {headers:{
      Authorization: "Bearer " + cookies.get('token')
    }})
    navigation("/")
  }

  return (
    <div className="drop-shadow-lg md:h-24 w-full py-4 mt-5 rounded-xl bg-neutral-700 flex items-center justify-between max-w-[820px] mx-auto px-2 md:px-12">
      <div className="flex items-center">
        <div className="flex-col ml-5">
          <h1 className="font-bold text-lg mb-1 md:text-3xl truncate">
            {theme}
          </h1>
          <p className="text-neutral-400 max-w-[16rem] md:max-w-[32rem] truncate md:text-base text-sm">
            {description}
          </p>
        </div>
      </div>
      {!potential ? (
        <Link to={`/group/${id}`}>
          <img src={max} className="h-6 w-6 opacity-80" />
        </Link>
      ) : (
        <button onClick={handleJoin}  className="py-2 px-5 rounded-full bg-neutral-100 text-neutral-900 font-bold opacity-85 hover:opacity-100">Join</button>
      )}
    </div>
  );
}

export default GroupCard;
