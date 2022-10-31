import React from "react";
import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { LoginContext } from "./LoginProvider";

function RequireAuth({ children }) {
  let auth = useContext(LoginContext);
  console.log("auth is ", auth);
  if (!auth.user) {
    if (auth.loading) {
      return <p>Loading...</p>;
    } else {
      //If user is not logged in, redirect to login page
      return <Navigate to="/" />;
    }
  }

  return children;
}

export default RequireAuth;
