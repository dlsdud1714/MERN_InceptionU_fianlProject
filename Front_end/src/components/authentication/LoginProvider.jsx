import React, { createContext, useEffect, useState } from "react";

export const LoginContext = createContext({
  loading: false,
  user: null,
  login: () => {},
  logout: () => {},
});

const LoginProvider = (props) => {
  const [user, setUser] = useState(null);
  // const [loggedInUser, setLoggedInUser] = useState(null)

  const [loading, setLoading] = useState(true);
  const finishLogin = (newUser) => {
    setUser(newUser);
    // setLoggedInUser(newUser)
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/loggedInUser");
        if (!response.ok) {
          console.error("error getting user");
        } else {
          const userData = await response.json();
          console.log(response);
          setUser(userData);

          console.log(userData);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.setItem('store', 'null')
  };
  const children = props.children;
  const theValues = { user, finishLogin, logout, loading };
  return (
    <LoginContext.Provider value={theValues}>{children}</LoginContext.Provider>
  );
};

export default LoginProvider;
