import React from 'react'

function Comment({content, like_count, user, avatar}) {
  return (
    <article className='bg-neutral-700 px-5 py-8 border-neutral-600 border-t flex flex-col w-full'>
        <div className='flex flex-row mb-4 items-center'>
        {avatar ? <img className='mr-2 w-6 h-6 rounded-full ' src={avatar} /> : <div className='mr-2 w-6 h-6 rounded-full bg-neutral-400' />}
        <p className='font-light text-neutral-400 text-sm'>{user}</p>
        </div>
        <h1 className='break-all'>{content}</h1>
    </article>
  )
}

export default Comment