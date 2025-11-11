import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Please enter your name to continue.");
      return;
    }
    login(name);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 dark:from-gray-900 dark:to-gray-800 transition-all">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-96 p-8 text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome to <span className="text-blue-600">CourseFlair</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-semibold">
            Enter your name
          </label>
          <input
            type="text"
            placeholder="e.g. Mridul"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 mb-4 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-5">
          *Mock login only — no password required*
        </p>
      </div>
    </div>
  );
}
