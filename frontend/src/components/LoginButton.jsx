import "../index.css";
import { Link } from "react-router-dom";

function LoginButton() {

  return (
    <a href="http://localhost:8000/spotify/redirect">
    <button className="max-w-3xl mx-10 my-5 font-bold bg-green-400 px-12 py-5 rounded-full ">
      SIGN IN WITH SPOTIFY
    </button>
    </a>
  );
}

export default LoginButton;
