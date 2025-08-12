import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-cardDark border-t border-primaryDark py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-accent">InternshipHub</h3>
          <p className="text-gray-400 mt-2">
            An innovative platform to connect mentors and interns for productive,
            transparent, and successful internships.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-accent transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent transition">About</Link></li>
            <li><Link to="/review" className="hover:text-accent transition">Review</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-gray-300 flex items-center gap-2">
            <FaPhoneAlt /> +91-XXXXXXXXXX
          </p>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
          <div className="flex gap-4 text-2xl">
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 text-sm">
        © {new Date().getFullYear()} InternshipHub. All rights reserved.
      </div>
    </footer>
  );
}
