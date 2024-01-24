import React from "react";
import Stat from "../components/Stat";

function Profile() {
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
    </div>
  );
}

export default Profile;
