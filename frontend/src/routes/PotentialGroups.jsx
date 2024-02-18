import React from 'react'
import { useLoaderData } from 'react-router-dom'
import GroupCard from '../components/GroupCard';

function PotentialGroups() {
  const groups = useLoaderData();

  return (
    <>
    <div className='pt-32 flex flex-center mx-auto max-w-[820px] flex-col px-5 pb-5'>
        <h1 className='text-3xl border-b pb-12 mb-5'>Recommended groups for you</h1>
        {groups && groups.map((group) => <GroupCard key={group.id} id={group.id} theme={group.theme} description={group.description} potential={true} />)}
    </div>
    </>
  )
}

export default PotentialGroups