import React from 'react'
import Avatar from './Avatar'

function Comment({content, like_count, user, avatar}) {
  return (
    <article className='bg-neutral-700 px-5 py-8 border-neutral-600 border-t flex flex-col w-full'>
        <div className='flex flex-row mb-4 items-center'>
        <Avatar av={avatar} height={6} width={6} />
        <p className='font-light text-neutral-400 text-sm'>{user}</p>
        </div>
        <h1 className='break-all'>{content}</h1>
    </article>
  )
}

export default Comment