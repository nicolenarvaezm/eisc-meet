import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";

export const routes = [
    {
        path: "/",
        element: <Navigate to="/login" replace/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/Home",
        element: <Home />,
    },
]

export const router = createBrowserRouter(routes);
