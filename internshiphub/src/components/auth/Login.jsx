import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const user = login(data.email, data.password);
    if (user) {
      if (user.role === "mentor") {
        navigate("/dashboard");
      } else if (user.role === "intern") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard"); // fallback
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-baseDark">
      <div className="bg-cardDark w-full max-w-md p-8 rounded-lg shadow-lg border border-primaryDark">
        <h2 className="text-3xl font-bold mb-6 text-center text-accent">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primaryDark text-white font-bold rounded shadow-lg"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <Link to="/forgot-password" className="hover:text-accent">
            Forgot Password?
          </Link>
          <Link to="/signup" className="hover:text-accent">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
