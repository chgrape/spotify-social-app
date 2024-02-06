import React from 'react'
import max from "../assets/maximize.svg"
import { Link } from 'react-router-dom'

function GroupCard({theme, description, id}) {
  return (
    <div className='drop-shadow-lg md:h-24 w-full py-4 mt-5 rounded-xl bg-neutral-700 flex items-center justify-between max-w-[820px] mx-auto px-2 md:px-12'>
      <div className='flex items-center'>
        <div className='flex-col ml-5'>
            <h1 className='font-bold text-lg mb-1 md:text-3xl truncate'>{theme}</h1>
            <p className='text-neutral-400 max-w-[16rem] md:max-w-[32rem] truncate md:text-base text-sm'>{description}</p>
        </div>
      </div>
        <Link to={`/group/${id}`}>
        <img src={max} className='h-6 w-6 opacity-80' />
        </Link>
    </div>
  )
}

export default GroupCard