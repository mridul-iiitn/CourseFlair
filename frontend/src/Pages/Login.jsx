import React, { useEffect } from "react";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */

    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large", width: "350" }
    );
  }, []);

  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;

    try {
      const backendRes = await fetch("http://127.0.0.1:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: idToken }),
      });

      const data = await backendRes.json();

      if (backendRes.ok) {
        localStorage.setItem("access_token", data.access_token);
        setToken(data.access_token);
        setUser(data.user);

        navigate("/dashboard"); 
      } else {
        alert("Login failed! Check backend logs.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Login to CourseFlair</h1>
      <div id="googleSignInDiv"></div>
    </div>
  );
}

export default Login;
