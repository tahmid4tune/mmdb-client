import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext) as any;
  return auth;
};

export default useAuth;
