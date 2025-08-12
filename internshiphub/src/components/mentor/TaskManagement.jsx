import { useState } from "react";
import { DUMMY_TASKS, DUMMY_USERS } from "../../data/dummyData";

export default function TaskManagement() {
  const [tasks] = useState(DUMMY_TASKS);

  const getUserName = (id) => {
    const u = DUMMY_USERS.find(user => user.id === id);
    return u ? u.name : "Unknown";
  };

  const statusColors = {
    completed: "text-success",
    "in-progress": "text-warning",
    pending: "text-gray-400"
  };

  const priorityColors = {
    high: "text-error",
    medium: "text-warning",
    low: "text-success"
  };

  return (
    <div className="bg-baseDark min-h-screen text-textLight p-8">
      <h2 className="text-xl font-bold mb-6 text-accent">Task Management</h2>
      <table className="min-w-full bg-cardDark border border-primaryDark rounded">
        <thead>
          <tr className="bg-primaryDark text-white">
            <th className="px-4 py-2 border border-primaryDark">Title</th>
            <th className="px-4 py-2 border border-primaryDark">Assigned To</th>
            <th className="px-4 py-2 border border-primaryDark">Status</th>
            <th className="px-4 py-2 border border-primaryDark">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="hover:bg-primaryDark/30">
              <td className="border border-primaryDark px-4 py-2">{t.title}</td>
              <td className="border border-primaryDark px-4 py-2">{getUserName(t.assignedTo)}</td>
              <td className={`border border-primaryDark px-4 py-2 font-semibold ${statusColors[t.status]}`}>
                {t.status}
              </td>
              <td className={`border border-primaryDark px-4 py-2 font-semibold ${priorityColors[t.priority]}`}>
                {t.priority}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
