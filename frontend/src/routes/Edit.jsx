import axios from "../../axios.config.js";
import React, {  useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import DropdownChoice from "../components/DropdownChoice";

function Edit() {
  const {post, groups} = useLoaderData();
  const postGroup = groups.find(group => group.id === post.group_id);
  const updatedGroups = groups.filter(group => group.id !== post.group_id)

  const navigation = useNavigate();

  const formRef = useRef(null);
  const [group, setGroup] = useState(postGroup.theme);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const isWhitespaceString = str => !str.replace(/\s/g, '').length

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isWhitespaceString(title) || isWhitespaceString(desc)){
      return;
    }
    await axios.put('/posts/' + post.id, {
      title:title ? title : post.title,
      content:desc ? desc : post.content,
      group:group
    })
    navigation("/")
  }
  
  return (
    <div className="max-w-[820px] flex flex-col mx-auto pt-32 px-5">
      <h1 className="pb-4 border-b border-neutral-400 text-2xl">Edit post</h1>
      <section className="my-5">
      {updatedGroups ? (
          <Dropdown name={group}>
            {updatedGroups.map((gr) => (
              <DropdownChoice key={gr.id} name={gr.theme} handleChange={(e) => setGroup(e.target.textContent)}  />
            ))}
          </Dropdown>
        ) : (
          <p>...</p>
        )}
      </section>
      <form
        ref={formRef}
        className="drop-shadow-lg h-[30rem] w-full bg-neutral-700 rounded-lg p-5"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-neutral-800 mb-5 w-full h-10 py-2 px-5 rounded-lg"
          placeholder={post.title}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="bg-neutral-800 mb-5 w-full h-[calc(100%-10rem)] py-2 px-5 rounded-lg"
          placeholder={post.content}
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <div className="w-full flex flex-row justify-end mt-4 border-t border-neutral-400 pt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setGroup("Choose Group");
              setTitle("");
              setDesc("");
            }}
            className="py-2 px-5 rounded-full border-neutral-400 border mr-5 bg-neutral-800 font-bold opacity-85 hover:opacity-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="py-2 px-5 rounded-full bg-neutral-100 text-neutral-900 font-bold opacity-85 hover:opacity-100"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
