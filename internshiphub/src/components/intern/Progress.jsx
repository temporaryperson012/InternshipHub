import { DUMMY_TASKS } from "../../data/dummyData";
import { useAuth } from "../../contexts/AuthContext";

export default function Progress() {
  const { user } = useAuth();
  const myTasks = DUMMY_TASKS.filter(t => t.assignedTo === user.id);
  const completed = myTasks.filter(t => t.status === "completed").length;
  const percent = myTasks.length > 0 ? Math.round((completed / myTasks.length) * 100) : 0;

  return (
    <div className="bg-baseDark min-h-screen text-textLight p-8">
      <h2 className="text-xl font-bold mb-6 text-accent">My Progress</h2>
      <div className="bg-cardDark rounded border border-primaryDark p-6 shadow max-w-md">
        <p className="mb-2">Completion: {percent}%</p>
        <div className="w-full bg-gray-700 h-4 rounded">
          <div
            className="h-4 bg-accent rounded text-black text-xs font-bold text-center"
            style={{ width: `${percent}%` }}
          >
            {percent > 15 && `${percent}%`}
          </div>
        </div>
      </div>
    </div>
  );
}
