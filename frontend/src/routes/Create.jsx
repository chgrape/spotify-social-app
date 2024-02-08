import { useRef, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import DropdownChoice from "../components/DropdownChoice";

function Create() {
  const url = "http://localhost:8000/api/posts";
  const groups = useLoaderData();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const [group, setGroup] = useState("Choose Group");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title == "" || desc == "" || group == "Choose Group"){
      return;
    }

    const data = axios.post(
      url,
      {
        title: title,
        content: desc,
        group: group
      },
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );

    navigate("/")
  };

  return (
    <div className="max-w-[820px] flex flex-col mx-auto pt-32 px-2">
      <h1 className='text-2xl border-b pb-4 mb-5'>Create a post</h1>
      <section className="my-5">
        {groups ? (
          <Dropdown name={group}>
            {groups.map((gr) => (
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
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="bg-neutral-800 mb-5 w-full h-[calc(100%-10rem)] py-2 px-5 rounded-lg"
          placeholder="Description"
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
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
