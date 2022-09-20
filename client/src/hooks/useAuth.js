import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const { username, role } = decodedToken.UserInfo;

    return { username, role };
  }
  return { username: null, role: null };
};

export default useAuth;
