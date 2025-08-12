import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import Footer from "../layout/Footer";
; // If you made footer reusable

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-baseDark text-textLight min-h-screen flex flex-col">
      {/* Header */}
      <section className="py-16 px-6 text-center" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold mb-4 text-accent">About InternshipHub</h1>
        <p className="max-w-3xl mx-auto text-gray-300">
          Learn more about our mission, our platform, and the developer behind this innovative internship management tool.
        </p>
      </section>

      {/* Platform Story */}
      <section className="py-12 px-6 max-w-6xl mx-auto md:grid md:grid-cols-2 gap-10 items-center">
        <div data-aos="fade-right">
          <h2 className="text-3xl font-bold text-accent mb-4">Our Story</h2>
          <p className="text-gray-300 leading-relaxed">
            InternshipHub was created to bridge the gap between mentors and interns, simplifying task management, tracking progress, and promoting collaboration. 
            We saw a need for a modern, intuitive platform that enhances internship experiences for everyone involved — and we built just that.
          </p>
        </div>
        <div data-aos="fade-left" className="bg-cardDark p-6 rounded-lg shadow-lg border border-primaryDark">
          <h3 className="text-xl font-semibold text-accent mb-3">Our Mission</h3>
          <p className="text-gray-300">
            To empower interns and mentors with a unified workspace where efficiency meets transparency, creating lasting professional relationships and fostering success.
          </p>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-12 px-6 bg-primaryDark bg-opacity-20">
        <h2 className="text-3xl font-bold text-center text-accent mb-10">What Makes Us Different</h2>
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Streamlined Task Management",
              desc: "Easily assign, track, and update tasks for better productivity."
            },
            {
              title: "Transparent Progress Tracking",
              desc: "Real-time stats and visual indicators to keep everyone aligned."
            },
            {
              title: "Professional Networking",
              desc: "Strengthen mentor-intern connections beyond the internship."
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-cardDark p-6 rounded-lg shadow hover:shadow-2xl transition-transform hover:-translate-y-1 border border-primaryDark"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <h3 className="text-xl font-semibold text-accent mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Developer */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-accent mb-6">About the Developer</h2>
        <div className="bg-cardDark p-6 rounded-lg shadow-lg border border-primaryDark inline-block">
          <h3 className="text-2xl font-semibold">XYZ DEVELOPER</h3>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
            Passionate full-stack developer, specializing in modern web technologies like React, Node.js, and Tailwind CSS.
            Dedicated to building intuitive, user-friendly, and scalable applications that solve real-world problems.
          </p>
          <div className="flex justify-center gap-6 text-2xl mt-4">
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              <FaLinkedin />
            </a>
            <a href="tel:+91XXXXXXXXXX" className="hover:text-accent transition">
              <FaPhoneAlt />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
