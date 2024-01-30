import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import comment from "../assets/message-circle.svg";
import like from "../assets/heart.svg";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";

function Post() {
  const [content, setContent] = useState("");
  const post = useLoaderData();
  const url = "http://localhost:8000/api/posts/comment"
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = axios.post(
      url,
      {
        post_id: post.id,
        username: sessionStorage.getItem("username"),
        content: content,
      },
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  };
  return (
    <div className="flex flex-col mx-auto pt-32 px-2 max-w-[820px]">
      <div className="w-full bg-neutral-700 rounded-t-lg p-5 flex flex-col justify-between">
        <div> 
          <div className="flex flex-row items-center mb-5">
            <h1 className="mr-12">{post.title}</h1>
            <img className="mr-2 h-6 w-6 rounded-full" alt="avatar" src={post.avatar} />
            <h1 className="text-neutral-400 text-sm">{post.username}</h1>
          </div>
          <p className="w-full break-all">{post.content}</p>
        </div>
        <div className="flex flex-row justify-end">
          <p>{post.like_count}</p>
          <img src={like} className="ml-2 mr-3" />
          <p>0</p>
          <img className="ml-2" src={comment} />
        </div>
      </div>
      <section className=" bg-neutral-700 p-5 rounded-b-lg mb-12">
        <h1 className="pb-4 border-b border-neutral-400 mb-5">Add a comment</h1>
        <form onSubmit={handleSubmit}>
        <textarea
            className="bg-neutral-800 mb-5 w-full py-2 px-5 rounded-lg max-h-32 resize-none"
            
            placeholder="Description"
            value={content}
            onChange={(e) => {
                e.preventDefault();
                setContent(e.target.value)
            }}
            />
            <input type="submit" placeholder="Submit"/>
        </form>
      </section>
    </div>
  );
}

export default Post;
