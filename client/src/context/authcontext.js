import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    console.log("loggin in...");

    const res = await axios.post(`${process.env.REACT_APP_API_URI}auth/login`, { inputs }, { withCredentials: true });

    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(`${process.env.REACT_APP_API_URI}auth/logout`, {}, { withCredentials: true });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
