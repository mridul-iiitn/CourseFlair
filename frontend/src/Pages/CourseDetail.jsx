import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import courses from "../Data/CoursesData";
import { UserContext } from "../Context/UserContext";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, userName } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const selected = courses.find((c) => c.id === parseInt(id));
    setCourse(selected);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600 dark:text-gray-300">
        Loading course details...
      </div>
    );
  }

  const handleEnroll = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    if (!stored.find((c) => c.id === course.id)) {
      stored.push(course);
      localStorage.setItem("enrolledCourses", JSON.stringify(stored));
    }

    setShowModal(true);
    setTimeout(() => setShowModal(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all"
    >
      {/* Banner */}
      <div
        className="h-72 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end px-8 pb-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
          <p className="text-lg mt-2 opacity-90">
            Instructor: {course.instructor}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
          Welcome to <span className="font-semibold">{course.title}</span>! Learn
          with structured lessons, practical projects, and expert guidance.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-800 shadow-md p-6 rounded-2xl mb-8">
          <p className="text-2xl font-bold text-blue-600">{course.price}</p>
          <button
            onClick={handleEnroll}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 mt-4 sm:mt-0"
          >
            Enroll Now
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-3">What You’ll Learn</h2>
          <ul className="list-disc list-inside space-y-2 text-lg opacity-90">
            <li>Core fundamentals of {course.title}</li>
            <li>Hands-on mini-projects and real-world examples</li>
            <li>Deep conceptual understanding</li>
            <li>Tips for building production-ready apps faster</li>
          </ul>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-sm text-gray-900 dark:text-gray-100"
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-3">
                Enrollment Successful 🎉
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Congrats <span className="font-semibold">{userName}</span>! You’ve successfully enrolled in{" "}
                <span className="font-semibold">{course.title}</span>.
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Back to Courses
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
