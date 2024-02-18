import "../index.css";
import home from "../assets/icons8-home.svg";
import about from "../assets/icons8-about.svg";
import { Link, Outlet } from "react-router-dom";
import ProfilePill from "./ProfilePill";
import { useEffect, useState } from "react";

function Navbar() {
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar'));
  const [user, setUser] = useState(localStorage.getItem('username'));
  useEffect(()=>{
    const updateStorage = () => {
      setAvatar(localStorage.getItem('avatar'))
      setUser(localStorage.getItem('username'))
    }

    window.addEventListener('storage', updateStorage);

    return () => {
      window.removeEventListener('storage', updateStorage);
    };
  },[])

  return (
    <>
      <nav className="flex flex-row justify-between sm:px-12 px-8 py-5 font-primary absolute w-full ">
        <h1 className="hidden sm:block text-3xl font-medium items-center">
          Socialify
        </h1>
        <div className="flex flex-row sm:items-center items-center justify-end w-full">
          <Link to="/">
            <img
              src={home}
              className="mx-5 transition-opacity duration-150 ease-in-out hover:opacity-100 opacity-70 h-6 w-6"
            />
          </Link>
          <img
            src={about}
            className="mx-5 transition-opacity duration-150 ease-in-out hover:opacity-100 opacity-70 h-6 w-6"
          />
          {user && <ProfilePill user={user} avatar={avatar} />}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Navbar;
