import React, { useState, useEffect } from "react";
import courses from "../Data/CoursesData";
import CourseCard from "../Components/CourseCard";
import { motion } from "framer-motion";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    const results = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 md:px-20 text-gray-800 dark:text-gray-100 transition-all duration-500">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Search, explore, and start your learning journey today.
        </p>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 border border-gray-300 dark:border-gray-600 rounded-full px-5 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No courses found for your search.
        </p>
      )}
    </div>
  );
}

export default Courses;
