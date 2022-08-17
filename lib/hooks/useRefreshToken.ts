import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { API_AUTH } from "../../utils/api-urls";
import axios from "../axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useContext(AuthContext) as any;
  const router = useRouter();
  const refresh = async () => {
    try {
      const response = await axios.post(`${API_AUTH}/refresh`, auth);
      setAuth((prev) => {
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data.accessToken;
    } catch (error) {
      router.push("/login");
    }
  };
  return refresh;
};

export default useRefreshToken;
