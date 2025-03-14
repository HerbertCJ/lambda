import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import User from "./pages/user/User.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    element: <User />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
