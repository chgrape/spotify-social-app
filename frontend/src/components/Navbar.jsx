import "../index.css";
import home from "../assets/icons8-home.svg";
import about from "../assets/icons8-about.svg";
import { Link, Outlet } from "react-router-dom";
import ProfilePill from "./ProfilePill";

function Navbar() {
  return (
    <>
      <nav className="flex flex-row justify-between px-12 py-5 font-primary fixed w-full">
        <h1 className="hidden sm:block text-3xl font-medium items-center">
          Socialify
        </h1>
        <div className="flex flex-row sm:items-center items-end">
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
          <ProfilePill />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Navbar;
