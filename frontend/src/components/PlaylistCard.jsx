import React, { useEffect, useState } from "react";
import PlaylistStat from "./PlaylistStat";

function PlaylistCard({ name, cover, params }) {
    const mapToPercent = (value, min, max) =>{
        const percentage = (value - min) / (max - min) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    }
    const [loudness, setLoudness] = useState(params.loudness)
    useEffect(()=>{
        setLoudness(mapToPercent(loudness,-30, 0))
    },[])

  return (
    <div className="m-5 bg-neutral-900 rounded-2xl p-4 ">
      <img className="w-[200px] h-[200px]" src={cover} />
      <h1 className="text-lg my-2">{name}</h1>
      <div className="w-full flex flex-col gap-2">
        <PlaylistStat color="bg-red-400" name="acousticness" param={params.acousticness*100} />
        <PlaylistStat color="bg-yellow-400" name="energy" param={params.energy*100} />
        <PlaylistStat color="bg-green-400" name="loudness" param={loudness} />
        <PlaylistStat color="bg-purple-400" name="valence" param={params.valence*100}/>
        <PlaylistStat color="bg-blue-400" name="liveness" param={params.liveness*100}/>
        <PlaylistStat color="bg-orange-400" name="instrumentalness" param={params.instrumentalness*100}/>
        <PlaylistStat color="bg-purple-300" name="danceability" param={params.danceability*100}/>
      </div>
    </div>
  );
}

export default PlaylistCard;
