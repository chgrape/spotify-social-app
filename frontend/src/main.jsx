import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./routes/Home.jsx";
import Create from "./routes/Create.jsx";
import Profile from "./routes/Profile.jsx";

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
        element: <Profile />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
