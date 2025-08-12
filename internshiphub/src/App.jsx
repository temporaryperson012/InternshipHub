import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./components/static/LandingPage";
import About from "./components/static/About";
import Review from "./components/static/Review";
import Contact from "./components/static/Contact";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import MentorDashboard from "./components/dashboard/MentorDashboard";
import InternDashboard from "./components/dashboard/InternDashboard";
import InternManagement from "./components/mentor/InternManagement";
import TaskManagement from "./components/mentor/TaskManagement";
import Reports from "./components/mentor/Reports";
import MyTasks from "./components/intern/MyTasks";
import Progress from "./components/intern/Progress";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthContext";
import Footer from "./components/layout/Footer";



function RoleBasedDashboard() {
  const { user } = useAuth();
  if (!user) return null;
  return user.role === "mentor" ? <MentorDashboard /> : <InternDashboard />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/review" element={<Review />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interns"
          element={
            <ProtectedRoute role="mentor">
              <InternManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute role="mentor">
              <TaskManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute role="mentor">
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute role="intern">
              <MyTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute role="intern">
              <Progress />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
