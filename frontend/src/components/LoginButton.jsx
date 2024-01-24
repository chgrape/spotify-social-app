import "../index.css";
import { Link } from "react-router-dom";

function LoginButton() {
  return (
    <Link to="/">
    <button className="max-w-3xl mx-10 my-5 font-bold bg-green-400 px-12 py-5 rounded-full ">
      SIGN IN WITH SPOTIFY
    </button>
    </Link>
  );
}

export default LoginButton;
