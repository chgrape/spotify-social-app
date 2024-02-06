import React from 'react'
import { useLoaderData } from 'react-router-dom'
import GroupCard from '../components/GroupCard';

function Groups() {
  const groups = useLoaderData();

  return (
    <div className='pt-32 flex flex-center m-2 flex-col'>
        {groups ? groups.map((group) => <GroupCard key={group.id} id={group.id} theme={group.theme} description={group.description} />) : <p>...</p>}
    </div>
  )
}

export default Groups