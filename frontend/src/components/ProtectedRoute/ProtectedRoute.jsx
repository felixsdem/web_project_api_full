import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, isCheckingAuth }) {
  if (isCheckingAuth) {
    return null;
  }

  return loggedIn ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;