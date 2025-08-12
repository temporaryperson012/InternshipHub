import { useParams } from "react-router-dom";

export default function StaticPage() {
  const { page } = useParams();
  const titles = {
    about: "About Us",
    pricing: "Pricing Plans",
    blog: "Our Blog",
    contact: "Contact Us",
    "forgot-password": "Forgot Password"
  };

  return (
    <div className="bg-baseDark text-textLight min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-accent mb-4">{titles[page] || "Page"}</h1>
      <p className="text-gray-400 text-lg">This is a placeholder for the <span className="text-accent">{titles[page] || page}</span> page.</p>
    </div>
  );
}
