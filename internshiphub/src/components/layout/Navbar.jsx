import { Link, useNavigate } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-baseDark text-textLight shadow-lg border-b border-primaryDark">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:text-accent transition">
          <AcademicCapIcon className="h-7 w-7 text-accent" />
          <span className="font-bold text-xl">InternshipHub</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <Link to="/about" className="hover:text-accent transition">About</Link>
          <Link to="/pricing" className="hover:text-accent transition">Pricing</Link>
          <Link to="/blog" className="hover:text-accent transition">Blog</Link>
          <Link to="/contact" className="hover:text-accent transition">Contact</Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User name now clickable */}
              <button
                onClick={() => navigate("/dashboard")}
                className="font-medium hover:text-accent transition"
              >
                {user.name}
              </button>
              <button
                onClick={logout}
                className="bg-error hover:bg-red-700 px-4 py-2 rounded shadow text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded bg-primary hover:bg-primaryDark text-white font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded bg-accent text-black font-bold hover:bg-yellow-400"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
