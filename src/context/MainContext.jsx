import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const MainContext = createContext(null);

export const MainProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("jwtToken") || null
  );
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existingToken = localStorage.getItem("jwtToken");
    if (existingToken && !token) {
      setToken(existingToken);
    } else if (token && !existingToken) {
      localStorage.setItem("jwtToken", token);
    } else if (!token && existingToken) {
      localStorage.removeItem("jwtToken");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (err) {
        console.error("Error decoding token:", err);
        setToken(null);
        localStorage.removeItem("jwtToken");
      }
    } else {
      setUserId(null);
    }
  }, [token]);

  return (
    <MainContext.Provider
      value={{
        user,
        token,
        userId,
        loading,
        setLoading,
        setToken,
        setUser,
        errors,
        setErrors,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
