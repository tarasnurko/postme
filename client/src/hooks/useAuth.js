import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAuthorized = false;
  let userId = null;
  let username = null;
  let role = null;

  if (token != null) {
    ({ id: userId, username, role } = jwtDecode(token));
    isAuthorized = true;
  }

  return { isAuthorized, userId, username, role };
};

export default useAuth;
