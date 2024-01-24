import React from 'react'
import heart from "../assets/heart.svg"
import max from "../assets/maximize.svg"

function PostCard({title, desc, likes}) {
  return (
    <div className='rounded-lg px-8 py-4 mx-5 my-2 bg-neutral-700 flex justify-around mx-auto w-[52rem] items-center'>
        <div className='flex-col flex items-center'>
            <img src={heart} className='w-8 h-8' />
            <p className='font-sm text-neutral-300'>{likes}</p>
        </div>
        <div className='mx-12 w-[85%] flex-col'>
            <h1 className='font-bold text-3xl'>{title}</h1>
            <p className='text-neutral-400 max-w-[32rem] truncate'>{desc}</p>
        </div>
        <img src={max} className='w-6 h-6 opacity-80' />
    </div>
  )
}

export default PostCard