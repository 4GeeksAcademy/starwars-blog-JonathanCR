import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Demo from "./pages/Demo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/demo", element: <Demo /> },
            { path: "/:type/:uid", element: <Single /> }
        ]
    }
]);

export default router;