import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider";

const Logout = () => {
  const authContext = useContext(LoginContext);

  const logout = authContext.logout;

  const navigate = useNavigate();
  useEffect(() => {
    const logoutUser = async () => {
        console.log("logging out");
      const response = await fetch("/api/logout");
      if (response.status === 200) {
        logout();
        navigate("/");
      } else {
        console.log("error logging out", response);
        alert("logout failed");
        navigate("/");
      }
    };
    logoutUser();
  }, [logout, navigate]);

  return null;
};

export default Logout;