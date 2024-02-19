import React from 'react'
import heart from "../assets/heart.svg"
import max from "../assets/maximize.svg"
import { Link } from 'react-router-dom'

function PostCard({title, desc, likes, id}) {

  return (
    <div className='drop-shadow-lg md:h-24 w-full px-5 py-4 mt-5 rounded-xl bg-neutral-700 flex items-center justify-between'>
      <div className='flex items-center w-[90%]'>
        <div className='flex-col flex items-center'>
            <img src={heart} className='w-6 h-6' />
            <p className='font-sm text-neutral-300'>{likes}</p>
        </div>
        <div className='mx-2 md:mx-12 flex-col max-w-[50%]'>
            <h1 className='font-bold text-lg mb-1 md:text-3xl truncate max-w-[32rem]'>{title}</h1>
            <p className='text-neutral-400 max-w-[32rem] truncate md:text-base text-sm'>{desc}</p>
        </div>
      </div>
        <Link to={`/post/${id}`}>
        <img src={max} className='h-6 w-6 opacity-80' />
        </Link>
    </div>
  )
}

export default PostCard