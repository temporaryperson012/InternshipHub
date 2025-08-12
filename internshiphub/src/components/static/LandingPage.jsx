import { Link } from "react-router-dom";
import { UserGroupIcon, ChartBarIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../layout/Footer";


export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const features = [
    { icon: UserGroupIcon, title: "Mentor-Intern Matching", desc: "Find the perfect mentorship pairing..." },
    { icon: ClockIcon, title: "Efficient Task Management", desc: "Assign, track, and manage ongoing internship tasks..." },
    { icon: ChartBarIcon, title: "Progress Tracking", desc: "Visualize and evaluate performance with analytics..." },
    { icon: CheckCircleIcon, title: "Seamless Collaboration", desc: "Stay connected and collaborate effectively..." },
  ];

  return (
    <div className="bg-baseDark text-textLight min-h-screen flex flex-col">
      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-6" data-aos="fade-up">
        <h1 className="text-5xl font-extrabold mb-4 text-accent">Empower Your Internships</h1>
        <p className="mb-6 text-lg text-gray-300 max-w-2xl">
          Manage internships, track progress, and collaborate — all in one beautiful platform.
        </p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-accent text-black px-6 py-3 rounded font-bold hover:bg-yellow-400 shadow-lg transition">Get Started</Link>
          <Link to="/about" className="bg-primary hover:bg-primaryDark px-6 py-3 rounded font-bold text-white">Learn More</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-cardDark border border-primaryDark shadow-xl rounded-lg p-6 text-center hover:shadow-2xl hover:-translate-y-1 transition transform" data-aos="zoom-in" data-aos-delay={i * 100}>
            <f.icon className="h-10 w-10 text-accent mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 text-center" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-accent mb-4">Ready to Level Up?</h2>
        <Link to="/signup" className="bg-accent text-black px-8 py-4 rounded font-bold hover:bg-yellow-400 shadow-lg transition">Join Now</Link>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
