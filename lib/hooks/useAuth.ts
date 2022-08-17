import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext) as any;
  return useContext(AuthContext);
};

export default useAuth;
