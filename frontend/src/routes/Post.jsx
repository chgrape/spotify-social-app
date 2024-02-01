import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import comment from "../assets/message-circle.svg";
import like from "../assets/heart.svg";
import axios from "axios";
import { Cookies } from "react-cookie";
import Comment from "../components/Comment";
import left from "../assets/chevron-left.svg";
import right from "../assets/chevron-right.svg";

function Post() {
  const [content, setContent] = useState("");
  const [offset, setOffset] = useState(1);
  const post = useLoaderData();
  const [comments, setComments] = useState([]);
  const url = "http://localhost:8000/api/post/" + post.id + "/comment";
  const cookies = new Cookies();

  useEffect(() => {
    const handleComments = async () => {
      const res = await axios.get(url + "/" + offset + "/3", {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      });
      console.log(offset)
      setComments(res.data);
    };
    handleComments();
  }, [offset]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      url,
      {
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
      <div className="bg-neutral-700 rounded-lg p-2">
        <div className="w-full bg-neutral-700 rounded-t-lg p-3 flex flex-col justify-between">
          <div>
            <div className="flex flex-row items-center mb-5">
              <h1 className="mr-12">{post.title}</h1>
              {post.avatar ? (
                <img
                  className="mr-2 h-6 w-6 rounded-full"
                  alt="avatar"
                  src={post.avatar}
                />
              ) : (
                <div className="h-6 w-6 bg-neutral-400 mr-2 rounded-full" />
              )}
              <h1 className="text-neutral-400 text-sm">{post.name}</h1>
            </div>
            <p className="w-full break-all">{post.content}</p>
          </div>
          <div className="flex flex-row justify-end">
            <p>{post.like_count}</p>
            <img src={like} className="ml-2 mr-3" />
            <p>{post.comment_cnt}</p>
            <img className="ml-2" src={comment} />
          </div>
        </div>
        <section className=" bg-neutral-700 p-5">
          <h1 className="pb-4 border-b border-neutral-400 mb-5">
            Add a comment
          </h1>
          <form onSubmit={handleSubmit}>
            <textarea
              className="bg-neutral-800 mb-5 w-full py-2 px-5 rounded-lg max-h-32 resize-none"
              placeholder="Description"
              value={content}
              onChange={(e) => {
                e.preventDefault();
                setContent(e.target.value);
              }}
            />
            <input type="submit" placeholder="Submit" />
          </form>
        </section>
        <section>
          {comments ? (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                content={comment.content}
                user={comment.name}
                avatar={comment.avatar}
              />
            ))
          ) : (
            <p>...</p>
          )}
          <div className="flex justify-end gap-5">
            <img
            className="cursor-pointer"
              onClick={(e) => {
                if(offset - 3 < 0){
                  return;
                }
                setOffset((old) => old - 3);
              }}
              src={left}
            />
            <img
            className="cursor-pointer"
              onClick={(e) => {
                if(offset + 3 > post.comment_cnt){
                  return;
                }
                setOffset((old) => old + 3);
              }}
              src={right}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Post;
