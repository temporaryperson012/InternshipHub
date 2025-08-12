import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../layout/Footer";


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Simulated)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-baseDark text-textLight min-h-screen flex flex-col">
      <section className="py-16 px-6 text-center" data-aos="fade-down">
        <h1 className="text-5xl font-extrabold mb-4 text-accent">Contact Us</h1>
        <p className="max-w-3xl mx-auto text-gray-300">
          Get in touch with the InternshipHub team for any questions or feedback.
        </p>
      </section>

      <section className="py-12 px-6 max-w-3xl mx-auto w-full" data-aos="fade-up">
        <form onSubmit={handleSubmit} className="bg-cardDark p-6 rounded-lg shadow-lg border border-primaryDark space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-baseDark border border-primaryDark text-textLight"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded bg-baseDark border border-primaryDark text-textLight"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded bg-baseDark border border-primaryDark text-textLight h-32"
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>
          <button type="submit" className="bg-primary hover:bg-primaryDark px-6 py-3 rounded text-white font-bold w-full">
            Send Message
          </button>
        </form>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
