import { useAuth } from "../../contexts/AuthContext";
import { DUMMY_TASKS, DUMMY_USERS } from "../../data/dummyData";
import { CheckCircleIcon, ClockIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState, useEffect } from "react";

export default function InternDashboard() {
  const { user } = useAuth();
  const [hoverTask, setHoverTask] = useState(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const tasksSectionRef = useRef(null);

  if (!user || user.role !== "intern") return null;

  const myTasks = DUMMY_TASKS.filter((t) => t.assignedTo === user.id);
  const completed = myTasks.filter((t) => t.status === "completed").length;
  const inProgress = myTasks.filter((t) => t.status === "in-progress").length;
  const pending = myTasks.filter((t) => t.status === "pending").length;
  const percent = myTasks.length ? Math.round((completed / myTasks.length) * 100) : 0;

  const statusColors = {
    completed: "bg-green-600 text-white",
    "in-progress": "bg-yellow-500 text-black",
    pending: "bg-gray-500 text-white",
  };
  const statusIcons = {
    completed: <CheckCircleIcon className="w-4 h-4 inline-block mr-1" />,
    "in-progress": <ClockIcon className="w-4 h-4 inline-block mr-1" />,
    pending: <PauseCircleIcon className="w-4 h-4 inline-block mr-1" />,
  };

  const formatDate = (isoStr) => new Date(isoStr).toLocaleDateString();
  const mentor = DUMMY_USERS.find(m => m.id === user.mentorId);

  return (
    <div className="bg-baseDark min-h-screen text-textLight px-8 py-8 space-y-8">
      {/* Intern Info */}
      <section className="p-6 bg-cardDark rounded border border-primaryDark shadow space-y-2">
        <h2 className="text-3xl font-bold text-accent">{user.name} (Intern)</h2>
        <p>Email: {user.email}</p>
        <p>University: {user.university}</p>
        <p>Internship: {user.startDate} - {user.endDate}</p>
        {mentor && <p>Mentor: {mentor.name}</p>}
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard label="Total Tasks" value={myTasks.length} />
        <StatCard label="Completed" value={completed} />
        <StatCard label="In Progress" value={inProgress} />
        <StatCard label="Pending" value={pending} />
      </section>

      {/* Overall Completion */}
      <section className="bg-cardDark p-6 rounded border border-primaryDark shadow">
        <h3 className="text-lg font-bold mb-2">Overall Completion</h3>
        <div className="h-4 bg-gray-700 rounded">
          <div className="h-4 bg-accent rounded" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-1 text-sm">{percent}% Completed</p>
      </section>

      {/* Quick Actions */}
      <section className="flex flex-wrap gap-4">
        <ActionButton label="View Progress" color="primary" onClick={() => setShowProgressModal(true)} />
        <ActionButton label="View All Tasks" color="accent" text="black" onClick={() => tasksSectionRef.current?.scrollIntoView({ behavior: "smooth" })} />
        {mentor && <ActionButton label="Contact Mentor" color="error" onClick={() => setShowContactModal(true)} />}
      </section>

      {/* My Tasks */}
      <section ref={tasksSectionRef} className="space-y-4">
        <h3 className="text-2xl font-bold text-accent">My Tasks</h3>
        <table className="w-full text-left border-collapse bg-cardDark rounded border border-primaryDark">
          <thead>
            <tr className="bg-primaryDark text-white">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {myTasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-primaryDark/30 transition"
                onMouseEnter={() => setHoverTask({ ...task, percent })}
                onMouseLeave={() => setHoverTask(null)}
              >
                <td className="px-3 py-2">{task.title}</td>
                <td className="px-3 py-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[task.status]}`}>
                    {statusIcons[task.status]} {task.status}
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

      {/* Hover Tooltip */}
      {hoverTask && (
        <div
          className="fixed z-50 p-4 bg-cardDark/80 backdrop-blur-sm border border-primaryDark rounded-lg shadow-xl animate-fadeIn pointer-events-none"
          style={{ top: window.event?.clientY + 15, left: window.event?.clientX + 15 }}
        >
          <h4 className="font-bold text-accent">{hoverTask.title}</h4>
          <p className="text-sm text-gray-300">{hoverTask.description}</p>
          <p>Status: {hoverTask.status}</p>
          <p>Due: {formatDate(hoverTask.dueDate)}</p>
          <div className="mt-1 h-2 bg-gray-700 rounded">
            <div className="h-2 bg-accent rounded" style={{ width: `${hoverTask.percent}%` }} />
          </div>
        </div>
      )}

      {/* Progress Modal */}
      {showProgressModal && (
        <Modal title="My Progress" onClose={() => setShowProgressModal(false)}>
          <p className="mb-4">Overall Completion: {percent}%</p>
          <div className="h-4 bg-gray-700 rounded mb-4">
            <div className="h-4 bg-accent rounded" style={{ width: `${percent}%` }} />
          </div>
          <ul className="space-y-2">
            <li>✅ Completed: {completed}</li>
            <li>⏳ In Progress: {inProgress}</li>
            <li>🕒 Pending: {pending}</li>
          </ul>
        </Modal>
      )}

      {/* Contact Mentor Modal */}
      {showContactModal && mentor && (
        <Modal title={`Contact ${mentor.name}`} onClose={() => setShowContactModal(false)}>
          <p className="mb-4">Send a message to your mentor.</p>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-2 mb-3 bg-baseDark border border-primaryDark rounded"
          />
          <textarea
            placeholder="Message"
            className="w-full p-2 mb-3 bg-baseDark border border-primaryDark rounded min-h-[100px]"
          ></textarea>
          <button
            onClick={() => { alert("Message sent (simulated)!"); setShowContactModal(false); }}
            className="bg-primary px-4 py-2 rounded text-white font-bold hover:bg-primaryDark"
          >
            Send
          </button>
        </Modal>
      )}
    </div>
  );
}

/* --- Subcomponents --- */
const StatCard = ({ label, value }) => (
  <div className="bg-cardDark p-4 rounded border border-primaryDark shadow text-center">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-gray-400">{label}</p>
  </div>
);

const ActionButton = ({ label, color, text = "white", onClick }) => {
  const colors = {
    primary: "bg-primary hover:bg-primaryDark",
    accent: "bg-accent hover:bg-yellow-400",
    error: "bg-error hover:bg-red-700",
  };
  return (
    <button onClick={onClick} className={`${colors[color]} px-6 py-3 rounded font-bold text-${text} shadow`}>
      {label}
    </button>
  );
};

const Modal = ({ title, children, onClose }) => {
  useEffect(() => { document.body.classList.add("overflow-hidden"); return () => document.body.classList.remove("overflow-hidden"); }, []);
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-cardDark rounded border border-primaryDark p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-accent">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};
