import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import CourseDetail from "./Pages/CourseDetail";
import Login from "./Pages/Login";
import './index.css'
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
    </>
      
  );
}

export default App;
