// src/components/dashboard/InternDashboard.jsx
import { useAuth } from "../../contexts/AuthContext";
import { DUMMY_TASKS } from "../../data/dummyData";

export default function InternDashboard() {
  const { user } = useAuth();
  if (!user || user.role !== "intern") return null;

  const myTasks = DUMMY_TASKS.filter(t => t.assignedTo === user.id);
  const completed = myTasks.filter(t => t.status === "completed").length;
  const percent = myTasks.length ? Math.round((completed / myTasks.length) * 100) : 0;

  const statusColors = {
    completed: "bg-success text-black",
    "in-progress": "bg-warning text-black",
    pending: "bg-gray-600 text-white",
  };

  const formatDate = (isoStr) => new Date(isoStr).toLocaleDateString();

  return (
    <div className="bg-baseDark min-h-screen text-textLight p-8 max-w-7xl mx-auto">
      {/* Intern Info */}
      <section className="mb-10 p-6 bg-cardDark rounded border border-primaryDark shadow">
        <h2 className="text-3xl font-bold mb-2 text-accent">{user.name}</h2>
        <p className="text-gray-400">Email: {user.email}</p>
        <p className="text-gray-400">University: {user.university}</p>
        <p className="text-gray-400">Internship: {user.startDate} - {user.endDate}</p>
      </section>

      {/* Progress */}
      <section className="mb-10 bg-cardDark p-6 rounded border border-primaryDark shadow">
        <p className="mb-2">Overall Completion: {percent}%</p>
        <div className="h-4 bg-gray-700 rounded">
          <div className="h-4 bg-accent" style={{ width: `${percent}%` }} />
        </div>
      </section>

      {/* Tasks */}
      <section>
        <h3 className="text-2xl font-bold mb-4 text-accent">My Tasks</h3>
        <table className="w-full text-left border-collapse bg-cardDark rounded border border-primaryDark">
          <thead>
            <tr className="bg-primaryDark text-white">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map(task => (
              <tr key={task.id} className="hover:bg-primaryDark/30 transition">
                <td className="px-3 py-2">{task.title}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded text-sm ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-3 py-2">{formatDate(task.dueDate)}</td>
              </tr>
            ))}
            {myTasks.length === 0 && (
              <tr>
                <td colSpan="3" className="py-3 px-3 text-gray-500 italic">
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
