import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext) as any;
  console.log(useContext(AuthContext))
  return auth;
};

export default useAuth;
