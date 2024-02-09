import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./routes/Home.jsx";
import Create from "./routes/Create.jsx";
import Profile from "./routes/Profile.jsx";
import Authorization from "./routes/Authorization.jsx";
import { Cookies } from "react-cookie";
import axios from "axios";
import Post from "./routes/Post.jsx";
import Groups from "./routes/Groups.jsx";
import Edit from "./routes/Edit.jsx";
import Group from "./routes/Group.jsx";
import Playlists from "./routes/Playlists.jsx";
import PotentialGroups from "./routes/PotentialGroups.jsx";
import { requireAuth } from "./assets/utils.js";

const url = "http://localhost:8000/api";
const cookies = new Cookies();

const router = createBrowserRouter([
  {
    element: <Navbar />,
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
          const res = await axios.get(url + "/groups", {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          
          return res.data;
        }
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          await requireAuth();
          const res = await axios.get(url + "/posts", {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          return res.data;
        },
      },
      {
        path: "/groups",
        element: <Groups />,
        loader: async () => {
          await requireAuth();
          const res = await axios.get(url + "/groups", {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          return res.data;
        },
      },
      {
        path: "/groups/potential",
        element: <PotentialGroups />,
        loader: async () => {
          await requireAuth();
          const res = await axios.get(url + "/group/potential", {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          return res.data;
        },
      },
      {
        path: "post/:id",
        element: <Post />,
        loader: async ({params}) => {
          await requireAuth();
          const res = await axios.get(url + "/posts/" + params.id, {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          return res.data;
        }
      },
      {
        path: "/group/:id",
        element: <Group />,
        loader: async ({params}) => {
          await requireAuth();
          const res = await axios.get(url + "/groups/" + params.id, {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          return res.data;
        }
      },
      {
        path: "/playlists",
        element: <Playlists />,
        loader: async () => {
          await requireAuth();
          const res = await axios.get(url + "/user/playlists", {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          return res.data;
        }
      },
      {
        path: "/post/:id/edit",
        element: <Edit />,
        loader: async ({params}) => {
          await requireAuth();
          const post = await axios.get(url + "/posts/" + params.id, {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          const groups = await axios.get(url + "/groups", {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });

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
