import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { DUMMY_USERS, DUMMY_TASKS } from "../../data/dummyData";

export default function MentorDashboard() {
  const { user } = useAuth();
  const [interns, setInterns] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.role === "mentor") {
      const myInterns = DUMMY_USERS.filter(
        (u) => u.role === "intern" && u.mentorId === user.id
      );
      setInterns(myInterns);

      const myTasks = DUMMY_TASKS.filter((t) => t.mentorId === user.id);
      setTasks(myTasks);
    }
  }, [user]);

  const getTasksByIntern = (internId) =>
    tasks.filter((t) => t.assignedTo === internId);

  const statusColors = {
    completed: "bg-success text-black",
    "in-progress": "bg-warning text-black",
    pending: "bg-gray-600 text-white",
  };

  const formatDate = (isoStr) =>
    new Date(isoStr).toLocaleDateString();

  if (!user || user.role !== "mentor") return null;

  return (
    <div className="bg-baseDark min-h-screen text-textLight px-8 py-8 w-full space-y-8">
      
      {/* Mentor Info */}
      <section className="p-6 bg-cardDark rounded border border-primaryDark shadow space-y-2">
        <h2 className="text-3xl font-bold text-accent">{user.name} (Mentor)</h2>
        <p className="text-gray-400">Email: {user.email}</p>
        <p className="text-gray-400">Department: {user.department}</p>
        <p className="text-gray-400">Experience: {user.experience}</p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard label="Total Tasks" value={tasks.length} />
        <StatCard
          label="Completed"
          value={tasks.filter((t) => t.status === "completed").length}
        />
        <StatCard
          label="In Progress"
          value={tasks.filter((t) => t.status === "in-progress").length}
        />
        <StatCard
          label="Pending"
          value={tasks.filter((t) => t.status === "pending").length}
        />
      </section>

      {/* Interns & Tasks */}
      <section className="space-y-8">
        <h3 className="text-2xl font-bold text-accent">Your Interns & Tasks</h3>

        {interns.map((intern) => {
          const internTasks = getTasksByIntern(intern.id);
          const completed = internTasks.filter(
            (t) => t.status === "completed"
          ).length;
          const percent = internTasks.length
            ? Math.round((completed / internTasks.length) * 100)
            : 0;

          return (
            <div
              key={intern.id}
              className="p-6 bg-cardDark rounded border border-primaryDark shadow space-y-4"
            >
              {/* Intern details & progress */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-semibold">{intern.name}</h4>
                  <p className="text-gray-400">{intern.university}</p>
                </div>
                <div className="w-40 text-right">
                  <p className="text-sm text-gray-400 mb-1">
                    {percent}% complete
                  </p>
                  <div className="h-3 bg-gray-700 rounded">
                    <div
                      className="h-3 bg-accent"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Tasks table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-primaryDark">
                    <th className="py-2 px-2">Task Title</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primaryDark">
                  {internTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-primaryDark/30 transition"
                    >
                      <td className="px-2 py-2">{task.title}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`px-2 py-1 rounded text-sm ${statusColors[task.status]}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-2 py-2">{formatDate(task.dueDate)}</td>
                    </tr>
                  ))}
                  {internTasks.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-3 px-2 text-gray-500 italic"
                      >
                        No tasks assigned
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-cardDark p-4 rounded border border-primaryDark shadow text-center space-y-1">
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
