import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function ProtectedRoute({ children }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  return currentUser ? children : (
    <Navigate to="/" replace state={{ openLogin: true, from: location.pathname }} />
  );
}

export default ProtectedRoute;
