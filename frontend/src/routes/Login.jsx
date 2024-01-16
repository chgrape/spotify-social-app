import LoginButton from "../components/LoginButton";
import "../index.css";

function Login() {
  return (
    <div className="flex flex-col justify-center w-full items-center py-32">
      <h1 className="text-3xl md:text-6xl xl:text-8xl font-primary font-bold max-w-6xl text-center leading-relaxed m-4">
        Connecting People.
      </h1>
      <p className="text-md md:text-md xl:text-lg max-w-xl leading-loose font-primary font-light text-center m-4">
        Bring social features to your Spotify account. Start communicating with
        your fellow human beings.
      </p>
      <LoginButton />
    </div>
  );
}

export default Login;
