import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
