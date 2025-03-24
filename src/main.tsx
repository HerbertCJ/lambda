import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";

import App from "./App.tsx";
import User from "./pages/user/User.tsx";
import Home from "./pages/home/Home.tsx";

import "./index.css";
import PrivateRoute from "./utils/PrivateRoute.tsx";

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: import.meta.env.VITE_COGNITO_RESPONSE_TYPE,
  scope: import.meta.env.VITE_COGNITO_SCOPE,
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/users",
    element: (
      <PrivateRoute>
        <User />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider {...cognitoAuthConfig}>
    <RouterProvider router={router} />
  </AuthProvider>
);

//Run Workflow 2
