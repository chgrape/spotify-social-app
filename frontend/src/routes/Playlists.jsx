import React from "react";
import { useLoaderData } from "react-router-dom";
import PlaylistCard from "../components/PlaylistCard";

function Playlists() {
  const {playlists, username} = useLoaderData();
  const exists = playlists ? playlists.length : false
  
  return (
    <div className="pt-32 mx-auto max-w-[920px] p-5">
      <h1 className="border-b pb-6 text-3xl">{username ? username + "'s Playlists" : "Your playlists"}</h1>
      <div className="mt-12 flex w-full flex-wrap justify-center">
        {exists ? (
          playlists.map((playlist) => {
            const {acousticness, valence, energy, instrumentalness, loudness, liveness, danceability} = playlist;
            return (
              <PlaylistCard
                key={playlist.id}
                name={playlist.name}
                cover={playlist.cover}
                params={{acousticness, valence, energy, instrumentalness, loudness, liveness, danceability}}
              />
            );
          })
        ) : username ? <h1>This user either doesn't have any playlists or they're private</h1> : <h1>You don't have any playlists or they're all private</h1>
        }
      </div>
    </div>
  );
}

export default Playlists;
