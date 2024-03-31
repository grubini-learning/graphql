import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Posts,
  Profile,
  Signin,
  Signup,
  // postsLoader,
} from "./pages";
import { AppLayout, NotFound } from "./ui";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
