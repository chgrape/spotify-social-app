import React, { useState } from "react";
import PlaylistStat from "./PlaylistStat";

function PlaylistCard({ name, cover, params }) {
    const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="m-5 bg-neutral-900 rounded-2xl p-4 ">
      {isOpen && <div className="w-[200px] h-[200px] bg-blue-400 absolute"></div>}
      <img className="w-[200px] h-[200px]" src={cover} />
      <h1 className="text-lg my-2">{name}</h1>
      <div className="w-full flex flex-row gap-2">
        <PlaylistStat setIsOpen={setIsOpen} color="bg-red-400" param="acousticness"/>
        <PlaylistStat setIsOpen={setIsOpen} color="bg-yellow-400" param="energy" />
        <PlaylistStat setIsOpen={setIsOpen} color="bg-green-400" param="acousticness" />
        <PlaylistStat setIsOpen={setIsOpen} color="bg-purple-400" param="valence"/>
        <PlaylistStat setIsOpen={setIsOpen} color="bg-blue-400" param="liveness"/>
      </div>
    </div>
  );
}

export default PlaylistCard;
