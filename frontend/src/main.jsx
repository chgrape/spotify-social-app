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
          const url = "http://localhost:8000/api/posts";
          const cookies = new Cookies();
          const res = await axios.get(url, {
            headers: {
              Authorization: "Bearer " + cookies.get("token"),
              Accept: "*/*",
            },
          });
          return res.data;
        },
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
