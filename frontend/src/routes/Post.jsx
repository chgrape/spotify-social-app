import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import comment from "../assets/message-circle.svg";
import like from "../assets/heart.svg";
import axios from "axios";
import { Cookies } from "react-cookie";
import Comment from "../components/Comment";
import left from "../assets/chevron-left.svg";
import right from "../assets/chevron-right.svg";
import edit from "../assets/edit-3.svg"
import del from "../assets/trash.svg"

function Post() {
  const [content, setContent] = useState("");
  const [offset, setOffset] = useState(1);
  const post = useLoaderData();
  const user = sessionStorage.getItem('username');
  const [commentCount, setCommentCount] = useState(post.comment_cnt);
  const [likes, setLikes] = useState(post.like_count);
  const [comments, setComments] = useState([]);
  const url = "http://localhost:8000/api/post/" + post.id;
  const cookies = new Cookies();
  const navigation = useNavigate();

  console.log(post)

  useEffect(() => {
    const handleComments = async () => {
      const res = await axios.get(url + "/comment/" + offset + "/3", {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      });
      setComments(res.data);
    };
    handleComments();
  }, [offset]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.delete("http://localhost:8000/api/posts/" + post.id, {headers:{
      Authorization: "Bearer " + cookies.get("token"),

    }})
    navigation("/profile")
  }

  const handleLike = async () =>{
    const res = await axios.post(url + "/like",{}, {
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
      }
    });
    setLikes(res.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(content === ""){
      return;
    }
    const data = await axios.post(
      url + "/comment",
      {
        content: content,
      },
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setContent("");
    setCommentCount(old => old + 1)
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
          <div className="flex flex-row justify-end items-center">
            {user == post.name && <Link to={"/post/" + post.id + "/edit"}><img src={edit} className="h-5 w-5 ml-2 cursor-pointer opacity-80" /></Link>}
            {user == post.name && <img src={del} className="h-5 w-5 ml-2 mr-12 cursor-pointer opacity-80" onClick={handleDelete} />}
            <p>{likes}</p>
            <img src={like} className="ml-2 mr-3 cursor-pointer" onClick={handleLike} />
            <p>{commentCount}</p>
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
            <input className="cursor-pointer" type="submit" placeholder="Submit" />
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
              onClick={() => {
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
                if(offset + 3 > commentCount){
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
