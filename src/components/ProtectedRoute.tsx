import { Navigate, Route } from "react-router-dom";
import { PATHS } from "../utils/consts";

const ProtectedRoute = ({ loggedIn, children, ...props }) => {
  return (
    <Route {...props}>
      {loggedIn ? children : <Navigate replace to={PATHS.login} />}
    </Route>
  );
};

export default ProtectedRoute;
