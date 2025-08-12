import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const { register, handleSubmit, watch } = useForm();
  const { addUser } = useAuth();
  const navigate = useNavigate();
  const role = watch("role");

  const onSubmit = (data) => {
    // Construct new user object
    const newUser = {
      id: crypto.randomUUID(), // unique id - modern alternative for uuid
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      ...(data.role === "mentor" ? { department: data.department, experience: "0 years" } : {}),
      ...(data.role === "intern" ? { university: data.university, startDate: "", endDate: "", mentorId: "" } : {})
    };

    const success = addUser(newUser);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-baseDark">
      <div className="bg-cardDark w-full max-w-md p-8 rounded-lg shadow-lg border border-primaryDark">
        <h2 className="text-3xl font-bold mb-6 text-center text-accent">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <select
            {...register("role", { required: true })}
            className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="mentor">Mentor</option>
            <option value="intern">Intern</option>
          </select>

          {role === "intern" && (
            <input
              {...register("university", { required: true })}
              placeholder="University"
              className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none"
            />
          )}

          {role === "mentor" && (
            <input
              {...register("department", { required: true })}
              placeholder="Department"
              className="w-full px-4 py-3 rounded bg-baseDark border border-primaryDark text-textLight focus:outline-none"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primaryDark text-white font-bold rounded shadow-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-accent">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
