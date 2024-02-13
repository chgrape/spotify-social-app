import React, { useState } from "react";
import Stat from "../components/Stat";
import PostCard from "../components/PostCard";
import { useLoaderData } from "react-router-dom";

function Profile() {
  const posts = useLoaderData()
  const [avatar, setAvatar] = useState(sessionStorage.getItem('avatar'));

  return (
    <div className="pt-32 flex justify-center flex-col max-w-[820px] mx-auto px-5">
      <header className="mx-auto w-full justify-center flex">
        <div className="w-full">
          <h1 className="text-5xl font-semibold my-3">{sessionStorage.getItem('username')}</h1>
          <aside className="my-5 flex flex-row ">
            <Stat statName="Likes" amount={posts.reduce((total, post) => total + post.like_count, 0)} />
            <Stat statName="Groups" amount="20" />
            <Stat statName="Posts" amount={posts.length} />
          </aside>
        </div>
        {avatar ? <img className='mr-2 h-36 w-36 rounded-full ' src={avatar} /> : <div className="h-36 w-36 rounded-full bg-neutral-300 max-md:hidden" />}
      </header>
      <div className="flex items-center flex-col border-t mt-12">
      {
        posts.length !== 0 ? posts.map((post) => <PostCard key={post.id} title={post.title} desc={post.content} likes={post.like_count} id={post.id} />) :
        <h1 className="text-3xl w-full pt-5">Oops, looks like you have no posts created :/</h1>
      }
      </div>
    </div>
  );
}

export default Profile;
