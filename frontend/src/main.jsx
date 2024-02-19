import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./routes/Home.jsx";
import Create from "./routes/Create.jsx";
import Profile from "./routes/Profile.jsx";
import Authorization from "./routes/Authorization.jsx";
import axios from "../axios.config.js";
import Post from "./routes/Post.jsx";
import Groups from "./routes/Groups.jsx";
import Edit from "./routes/Edit.jsx";
import Group from "./routes/Group.jsx";
import Playlists from "./routes/Playlists.jsx";
import PotentialGroups from "./routes/PotentialGroups.jsx";
import { requireAuth } from "./assets/utils.js";
import ErrorComponent from "./components/ErrorComponent.jsx";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
        loader: async () =>{
          await requireAuth();
          return null;
        }
      },
      {
        path: "/create",
        element: <Create />,
        loader: async()=>{
          await requireAuth();
          const res = await axios.get("/groups");
          return res.data;
        }
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          await requireAuth();
          const posts = await axios.get("/posts");
          const group_count = await axios.get("/group/count")
          return {posts: posts.data, group_count: group_count.data};
        },
      },
      {
        path: "/groups",
        element: <Groups />,
        loader: async () => {
          await requireAuth();
          const res = await axios.get("/groups");
          return res.data;
        },
      },
      {
        path: "/groups/potential",
        element: <PotentialGroups />,
        loader: async () => {
          await requireAuth();
          const res = await axios.get("/group/potential");
          return res.data;
        },
      },
      {
        path: "post/:id",
        element: <Post />,
        loader: async ({params}) => {
          await requireAuth();
          const res = await axios.get("/posts/" + params.id).catch((e)=> {
            throw new Response("msg", {status: 500})
          });
          const group = await axios.get("/groups/" + res.data.group_id)
          return {post: res.data, group: group.data};
        }
      },
      {
        path: "/group/:id",
        element: <Group />,
        loader: async ({params}) => {
          await requireAuth();
          const res = await axios.get("/groups/" + params.id).catch((e)=> {
            throw new Response("msg", {status: 500})
          });
          return res.data;
        }
      },
      {
        path: "/playlists",
        element: <Playlists />,
        loader: async () => {
          await requireAuth();
          const res = await axios.get("/user/playlists");
          return res.data;
        }
      },
      {
        path: "/user/:id/playlists",
        element: <Playlists />,
        loader: async ({params}) => {
          await requireAuth();
          const res = await axios.get("/user/" + params.id + "/playlists/");
          return res.data;
        }
      },
      {
        path: "/post/:id/edit",
        element: <Edit />,
        loader: async ({params}) => {
          await requireAuth();
          const post = await axios.get("/posts/" + params.id).catch((e)=> {
            throw new Response("msg", {status: 404})
          } );
          
          const groups = await axios.get("/groups");

          return {post: post.data, groups: groups.data};
        }
      },
      {
        path: "/authorization",
        element: <Authorization />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
