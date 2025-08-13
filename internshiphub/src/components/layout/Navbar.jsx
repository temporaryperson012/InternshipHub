import { Link, useNavigate } from "react-router-dom";
import { AcademicCapIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNameClick = () => {
    if (!user) return;
    navigate("/dashboard");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Review", path: "/review" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-baseDark text-textLight shadow-lg border-b border-primaryDark">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:text-accent transition">
          <AcademicCapIcon className="h-7 w-7 text-accent" />
          <span className="font-bold text-xl">Intern Book</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-accent transition relative group"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <button
                onClick={handleNameClick}
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XMarkIcon className="h-6 w-6 text-accent" /> : <Bars3Icon className="h-6 w-6 text-accent" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-baseDark border-t border-primaryDark px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block hover:text-accent transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-2 border-t pt-4 border-primaryDark">
              <button
                onClick={() => { handleNameClick(); setMenuOpen(false); }}
                className="text-left hover:text-accent"
              >
                {user.name}
              </button>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="bg-error hover:bg-red-700 px-4 py-2 rounded shadow text-white w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 border-t pt-4 border-primaryDark">
              <Link to="/login" className="px-4 py-2 rounded bg-primary hover:bg-primaryDark text-white font-semibold" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="px-4 py-2 rounded bg-accent text-black font-bold hover:bg-yellow-400" onClick={() => setMenuOpen(false)}>Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
