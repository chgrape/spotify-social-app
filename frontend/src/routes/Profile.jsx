import React from "react";
import Stat from "../components/Stat";
import PostCard from "../components/PostCard";
import { useLoaderData } from "react-router-dom";

function Profile() {
  const posts = useLoaderData()
  
  return (
    <div className="pt-32 flex justify-center flex-col max-w-[820px] mx-auto px-2">
      <header className="mx-auto w-full justify-center flex">
        <div className="w-full">
          <h1 className="text-5xl font-semibold my-3">{sessionStorage.getItem('username')}</h1>
          <aside className="my-5 flex flex-row ">
            <Stat statName="Likes" amount={posts.reduce((total, post) => total + post.like_count, 0)} />
            <Stat statName="Groups" amount="2" />
            <Stat statName="Posts" amount={posts.length} />
          </aside>
        </div>
        <div className="h-36 w-36 rounded-full bg-neutral-300 max-md:hidden" />
      </header>
      <div className="flex items-center flex-col">
      {
        posts.map((post) => <PostCard key={post.id} title={post.title} desc={post.content} likes={post.like_count} id={post.id} />)
      }
      </div>
    </div>
  );
}

export default Profile;
