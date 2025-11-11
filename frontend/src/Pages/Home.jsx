import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import courses from "../Data/CoursesData";
import CourseCard from "../Components/CourseCard";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white 
    dark:from-gray-900 dark:via-gray-800 dark:to-black dark:text-gray-100 transition-all duration-500">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-20 px-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Learn Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Explore high-quality courses and boost your skills with interactive lessons.
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Browse Courses
        </button>
      </motion.div>

      {/* Featured Courses Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-t-3xl p-10 transition-all"
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                Instructor: {course.instructor}
              </p>
              <p className="text-blue-600 font-semibold mb-3">{course.price}</p>
              <button
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
