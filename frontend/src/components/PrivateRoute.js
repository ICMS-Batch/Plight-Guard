import { useAuth } from "auth";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "config/constants";

const PrivateElement = ({ element }) => {
  const location = useLocation();

  const { state } = useAuth();
  const { isUserLoggedIn } = state;

  return isUserLoggedIn ? (
    element
  ) : (
    <Navigate to={LOGIN} state={{ prevLocation: location.pathname }} />
  );
};

export default PrivateElement;
