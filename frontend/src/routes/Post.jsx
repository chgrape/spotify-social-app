import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import comment from "../assets/message-circle.svg"
import like from "../assets/heart.svg"

function Post() {
    const post = useLoaderData();
    console.log(post.avatar)

  return (
    <div className='pt-32 w-[820px] flex flex-col mx-auto'>
        <div className='drop-shadow-lg h-[30rem] w-full bg-neutral-700 rounded-lg p-5 flex flex-col justify-between'>
            <div>
            <div className='flex flex-row items-center mb-5'>
                <h1 className='mr-12'>{post.title}</h1>
                <img className='mr-2 h-6 w-6 rounded-full ' src={post.avatar} />
                <h1 className='text-neutral-400 text-sm'>{post.username}</h1>
            </div>
            <p className='max-w-[820px] break-all'>{post.content}</p>
            </div>
            <div className='flex flex-row justify-end'>
                <p>{post.like_count}</p>
                <img src={like} className='ml-2 mr-3'/>
                <p>0</p>
                <img className='ml-2' src={comment} />
            </div>
        </div>
        
    </div>
  )
}

export default Post