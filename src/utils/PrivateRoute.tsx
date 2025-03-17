import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";

import { PrivateRouteProps } from "./PrivateRoute.type";

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return children;
  }

  return (
    <div>
      <h2>Your session expired, please login again.</h2>
      <Link to="/">Login</Link>
    </div>
  );
}

export default PrivateRoute;
