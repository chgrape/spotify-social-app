import React from 'react'
import { useLoaderData } from 'react-router-dom'
import PlaylistCard from '../components/PlaylistCard';

function Playlists() {
  const playlists = useLoaderData();
  console.log(playlists);

  return (
    <div className='pt-32 mx-auto max-w-[820px]'>
        <h1 className='border-b pb-6 text-3xl'>Your playlists</h1>
        <div className='mt-12 flex w-full flex-wrap justify-center'>
        {playlists ? playlists.map((playlist) => <PlaylistCard key={playlist.id} name={playlist.name} cover={playlist.cover} />) : <h1>Looks like you either don't have playlists or they're all private...</h1>}
        </div>
    </div>
  )
}

export default Playlists