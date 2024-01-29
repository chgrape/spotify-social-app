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
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
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
        path: "post/:id",
        element: <Post />,
        loader: async ({params}) => {
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
