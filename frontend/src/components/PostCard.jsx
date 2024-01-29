import React from 'react'
import heart from "../assets/heart.svg"
import max from "../assets/maximize.svg"
import { Link } from 'react-router-dom'

function PostCard({title, desc, likes, id}) {
  return (
    <div className='drop-shadow-lg h-24 w-full block md:w-[52rem] pl-5 pr-10 py-4 m-2 md:flex md:flex-row rounded-xl bg-neutral-700 items-center'>
        <div className='flex-col flex items-center'>
            <img src={heart} className='w-8 h-8' />
            <p className='font-sm text-neutral-300'>{likes}</p>
        </div>
        <div className='mx-12 w-[85%] flex-col'>
            <h1 className='font-bold text-3xl mb-1'>{title}</h1>
            <p className='text-neutral-400 max-w-[32rem] truncate'>{desc}</p>
        </div>
        <Link to={`/post/${id}`}>
        <img src={max} className='w-6 h-6 opacity-80' />
        </Link>
    </div>
  )
}

export default PostCard