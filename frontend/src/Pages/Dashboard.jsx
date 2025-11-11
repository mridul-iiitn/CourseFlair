import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { isLoggedIn, userName } = useContext(UserContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(stored);
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 md:px-20 text-gray-800 dark:text-gray-100 transition-all duration-500">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome, <span className="text-blue-600">{userName}</span> 👋
      </h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="text-lg mb-4">You haven't enrolled in any courses yet.</p>
          <Link
            to="/courses"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {enrolledCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Instructor: {course.instructor}
                </p>
                <p className="text-blue-600 font-semibold mb-4">{course.price}</p>
                <Link
                  to={`/course/${course.id}`}
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
