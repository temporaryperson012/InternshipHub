import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../layout/Footer";


export default function Review() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const testimonials = [
    { name: "John Doe", role: "Mentor", review: "InternshipHub has transformed the way I manage interns!" },
    { name: "Jane Smith", role: "Intern", review: "A game-changer for tracking my internship progress." },
    { name: "Mike Lee", role: "Mentor", review: "The best platform for productive collaboration." },
  ];

  return (
    <div className="bg-baseDark text-textLight min-h-screen flex flex-col">
      <section className="py-16 px-6 text-center" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold mb-4 text-accent">User Reviews</h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Hear it from those who use InternshipHub every day.
        </p>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-cardDark border border-primaryDark rounded-lg p-6 shadow-lg hover:shadow-2xl transition" data-aos="fade-up" data-aos-delay={i * 100}>
            <p className="italic text-gray-300 mb-4">"{t.review}"</p>
            <p className="font-semibold text-accent">- {t.name}, {t.role}</p>
          </div>
        ))}
      </section>

      {/* <Footer /> */}
    </div>
  );
}
