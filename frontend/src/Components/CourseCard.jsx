import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
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
    </div>
  );
}

export default CourseCard;
