import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }
  }, []);

  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("userName");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
