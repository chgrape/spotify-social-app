import React from 'react'
import { useLoaderData } from 'react-router-dom'
import PostCard from '../components/PostCard';

function Group() {
    const {posts, theme} = useLoaderData();

  return (
    <div className='pt-32 flex flex-center m-2 flex-col max-w-[820px] mx-auto px-5'>
        <h1 className='text-3xl border-b pb-12 mb-5'>{theme}</h1>
        {posts.length !== 0 ? posts.map((post) => <PostCard key={post.id} title={post.title} desc={post.content} likes={post.like_count} id={post.id} />) :
        <h1 className='text-xl text-justify md:text-6xl m-5'>Oops, looks like this group doesn't have any posts yet :/</h1>}
    </div>
  )
}

export default Group