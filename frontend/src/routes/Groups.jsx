import React from 'react'
import { useLoaderData } from 'react-router-dom'
import GroupCard from '../components/GroupCard';

function Groups() {
  const groups = useLoaderData();

  return (
    <>
    <div className='pt-32 flex flex-center mx-auto max-w-[820px] flex-col px-5 pb-5'>
        <h1 className='text-3xl border-b pb-12 mb-5'>Groups you're a part of</h1>
        {groups ? groups.map((group) => <GroupCard key={group.id} id={group.id} theme={group.theme} description={group.description} />) : <p>...</p>}
    </div>
    </>
  )
}

export default Groups