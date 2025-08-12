import { DUMMY_TASKS } from "../../data/dummyData";
import { useAuth } from "../../contexts/AuthContext";

export default function MyTasks() {
  const { user } = useAuth();
  const myTasks = DUMMY_TASKS.filter(t => t.assignedTo === user.id);

  const statusColors = {
    completed: "text-success",
    "in-progress": "text-warning",
    pending: "text-gray-400"
  };

  return (
    <div className="bg-baseDark min-h-screen text-textLight p-8">
      <h2 className="text-xl font-bold mb-6 text-accent">My Tasks</h2>
      <ul className="space-y-3">
        {myTasks.map(task => (
          <li key={task.id} className="bg-cardDark p-4 rounded border border-primaryDark shadow">
            <p className="font-bold">
              {task.title}
              <span className={`ml-2 text-sm font-medium ${statusColors[task.status]}`}>
                ({task.status})
              </span>
            </p>
            <p className="text-sm text-gray-400">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
