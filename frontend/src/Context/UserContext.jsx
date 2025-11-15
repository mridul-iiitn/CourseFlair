import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [user, setUser] = useState(null);

  // Load user if token exists on refresh
  useEffect(() => {
    const loadUser = async () => {
      // *** THIS IS THE FIX ***
      // Only fetch user if we have a token but NO user object.
      // This runs on page refresh, but not during login.
      if (token && !user) {
        try {
          const res = await fetch("http://127.0.0.1:5000/api/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();

          if (res.ok) {
            setUser(data);
          } else {
            // Token is invalid or expired
            setToken(null);
            localStorage.removeItem("access_token");
          }
        } catch (err) {
          console.error("Failed to load user:", err);
          // If server is down or other error, clear token
          setToken(null);
          localStorage.removeItem("access_token");
        }
      }
    };

    loadUser();
  }, [token, user]); // <-- Add `user` to the dependency array

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);