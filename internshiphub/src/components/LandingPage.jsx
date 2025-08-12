import { UserGroupIcon, ClockIcon, ChartBarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const features = [
    { icon: UserGroupIcon, title: "Mentor-Intern Matching", desc: "Connect mentors & interns for productive learning." },
    { icon: ClockIcon, title: "Task Management", desc: "Assign, track and manage internship tasks effortlessly." },
    { icon: ChartBarIcon, title: "Progress Analytics", desc: "Track and visualize progress trends easily." },
    { icon: CheckCircleIcon, title: "Real-time Updates", desc: "Instant notifications on activities & progress." }
  ];

  return (
    <div className="bg-baseDark text-textLight min-h-screen flex flex-col">
      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-5xl font-extrabold mb-4 text-accent">Empower Your Mentorship Journey</h1>
        <p className="mb-6 text-lg text-gray-300 max-w-2xl">Manage internships, track progress, and enhance collaboration in one beautiful platform.</p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-accent text-black px-6 py-3 rounded font-bold hover:bg-yellow-400 shadow-lg transition">Get Started</Link>
          <Link to="/login" className="bg-primary hover:bg-primaryDark px-6 py-3 rounded font-bold text-white">Sign In</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-cardDark border border-primaryDark shadow-xl rounded-lg p-6 text-center hover:shadow-2xl transition">
            <f.icon className="h-10 w-10 text-accent mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="bg-cardDark py-6 text-center border-t border-primaryDark text-gray-400">
        InternshipHub © {new Date().getFullYear()} | All rights reserved.
      </footer>
    </div>
  );
}
