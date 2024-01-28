import { useRef, useState } from "react";
import axios from 'axios'
import { Cookies } from "react-cookie";
import { redirect } from "react-router-dom";

function Create() {
  const url = "http://localhost:8000/api/posts"

  const formRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [group, setGroup] = useState("Choose Group");

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const cookies = new Cookies()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = axios.post(url, {
      title: title,
      content: desc
    }, {
      headers:{
        'Authorization': 'Bearer ' + cookies.get('token')
      }
    })

    return redirect("/")
  }

  return (
    <div style={{ maxWidth: "820px" }} className="flex flex-col mx-auto pt-32">
      <div className="mx-5">
        <h1 className="pb-4 border-b border-neutral-400">Create a post</h1>
        <section className="my-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-72 flex py-2 px-5 bg-neutral-700 h-10 rounded-lg ${
              isOpen ? "border ring-2 ring-white ring-opacity-10 " : "border"
            } border-neutral-600 drop-shadow-lg hover:bg-neutral-600`}
          >
            <p>{group}</p>
          </button>
          <div
            className={
              !isOpen
                ? "hidden"
                : "z-10 absolute mt-2 bg-neutral-700 rounded-lg w-72 border border-neutral-600 ring-2 ring-white ring-opacity-10"
            }
          >
            <button
              onClick={(e) => {
                setGroup(e.target.textContent);
                setIsOpen(false);
              }}
              className="block px-4 py-2 rounded-lg hover:bg-neutral-600 text-left w-full"
            >
              Item1
            </button>
            <button
              onClick={(e) => {
                setGroup(e.target.textContent);
                setIsOpen(false);
              }}
              className="block px-4 py-2 rounded-lg hover:bg-neutral-600 text-left w-full"
            >
              Item2
            </button>
            <button
              onClick={(e) => {
                setGroup(e.target.textContent);
                setIsOpen(false);
              }}
              className="block px-4 py-2 rounded-lg hover:bg-neutral-600 text-left w-full"
            >
              Item3
            </button>
          </div>
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
            onChange={(e)=>{setTitle(e.target.value)}}
          />
          <textarea
            className="bg-neutral-800 mb-5 w-full h-[calc(100%-10rem)] py-2 px-5 rounded-lg"
            placeholder="Description"
            value={desc}
            onChange={(e)=>{setDesc(e.target.value)}}
          />
          <div className="w-full flex flex-row justify-end mt-4 border-t border-neutral-400 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setTitle("")
                setDesc("")
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
    </div>
  );
}

export default Create;
