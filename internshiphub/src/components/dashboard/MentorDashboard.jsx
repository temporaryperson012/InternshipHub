import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { DUMMY_USERS, DUMMY_TASKS } from "../../data/dummyData";
import { CheckCircleIcon, ClockIcon, PauseCircleIcon } from "@heroicons/react/24/solid";

export default function MentorDashboard() {
  const { user } = useAuth();
  const [interns, setInterns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showInternModal, setShowInternModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [assignTaskInfo, setAssignTaskInfo] = useState({ internId: "", taskId: "" });
  const [hoverTask, setHoverTask] = useState(null);

  // ==== On Load ====
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

  // ==== Helper Functions ====
  const getTasksByIntern = (id) => tasks.filter((t) => t.assignedTo === id);
  const formatDate = (iso) => new Date(iso).toLocaleDateString();

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

  // ==== Task Management ====
  const handleAddTask = () => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: "New Task",
      description: "Write description...",
      mentorId: user.id,
      assignedTo: "",
      status: "pending",
      priority: "medium",
      dueDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks([...tasks, newTask]);
    setEditTaskId(newTask.id);
  };
  const handleSaveTask = (updated) => {
    setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
    setEditTaskId(null);
  };
  const handleRemoveTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  // ==== Intern Management ====
  const handleAddOrEditIntern = (intern) => {
    if (interns.some((i) => i.id === intern.id)) {
      setInterns(interns.map((i) => (i.id === intern.id ? intern : i)));
    } else {
      setInterns([...interns, intern]);
    }
  };
  const handleRemoveIntern = (id) => {
    setInterns(interns.filter((i) => i.id !== id));
    setTasks(tasks.filter((t) => t.assignedTo !== id));
  };

  // ==== Assign Tasks ====
  const handleAssignTask = () => {
    if (!assignTaskInfo.internId || !assignTaskInfo.taskId) return;
    setTasks(tasks.map((t) =>
      t.id === assignTaskInfo.taskId
        ? { ...t, assignedTo: assignTaskInfo.internId }
        : t
    ));
    setAssignTaskInfo({ internId: "", taskId: "" });
  };

  if (!user) return null;

  return (
    <div className="bg-baseDark min-h-screen text-textLight px-8 py-8 space-y-8">

      {/* Mentor Info */}
      <section className="p-6 bg-cardDark rounded border border-primaryDark shadow space-y-2">
        <h2 className="text-3xl font-bold text-accent">{user.name} (Mentor)</h2>
        <p>Email: {user.email}</p>
        <p>Department: {user.department}</p>
        <p>Experience: {user.experience}</p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard label="Total Tasks" value={tasks.length} />
        <StatCard label="Completed" value={tasks.filter(t => t.status === "completed").length} />
        <StatCard label="In Progress" value={tasks.filter(t => t.status === "in-progress").length} />
        <StatCard label="Pending" value={tasks.filter(t => t.status === "pending").length} />
      </section>

      {/* Actions */}
      <section className="flex flex-wrap gap-4">
        <ActionButton label="Manage Tasks" color="primary" onClick={() => setShowTaskModal(true)} />
        <ActionButton label="Assign Tasks to Interns" color="accent" text="black" onClick={() => setShowAssignModal(true)} />
        <ActionButton label="Manage Interns" color="error" onClick={() => setShowInternModal(true)} />
      </section>

      {/* Intern List */}
      <section className="space-y-8">
        <h3 className="text-2xl font-bold text-accent">Your Interns & Tasks</h3>
        {interns.map((intern) => {
          const internTasks = getTasksByIntern(intern.id);
          const percent = internTasks.length
            ? Math.round(
                (internTasks.filter(t => t.status === "completed").length / internTasks.length) * 100
              )
            : 0;

          return (
            <div key={intern.id} className="p-6 bg-cardDark rounded border border-primaryDark shadow space-y-4">
              {/* Intern Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-semibold">{intern.name}</h4>
                  <p className="text-gray-300">{intern.university}</p>
                </div>
                <ProgressBar percent={percent} />
              </div>
              {/* Tasks Table */}
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-primaryDark">
                    <th className="py-2 px-2">Task</th>
                    <th className="py-2 px-2">Status</th>
                    <th className="py-2 px-2">Due</th>
                  </tr>
                </thead>
                <tbody>
                  {internTasks.length
                    ? internTasks.map((task) => (
                        <tr
                          key={task.id}
                          onMouseEnter={() => setHoverTask({ ...task, percent })}
                          onMouseLeave={() => setHoverTask(null)}
                          className="relative hover:bg-primaryDark/30 transition"
                        >
                          <td className="px-2 py-2">{task.title}</td>
                          <td className="px-2 py-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[task.status]}`}>
                              {statusIcons[task.status]} {task.status}
                            </span>
                          </td>
                          <td className="px-2 py-2">{formatDate(task.dueDate)}</td>
                        </tr>
                      ))
                    : <tr><td colSpan="3" className="py-3 text-center text-gray-400 italic">No tasks</td></tr>}
                </tbody>
              </table>
            </div>
          );
        })}
      </section>

      {/* Hover Tooltip */}
      {hoverTask && <Tooltip task={hoverTask} formatDate={formatDate} />}

      {/* Modals */}
      {showTaskModal &&
        <ManageTasksModal {...{ tasks, editTaskId, setEditTaskId, handleAddTask, handleRemoveTask, handleSaveTask }} onClose={() => setShowTaskModal(false)} />}
      {showAssignModal &&
        <AssignTasksModal {...{ interns, tasks, assignTaskInfo, setAssignTaskInfo, handleAssignTask }} onClose={() => setShowAssignModal(false)} />}
      {showInternModal &&
        <ManageInternModal {...{ interns, handleAddOrEditIntern, handleRemoveIntern }} onClose={() => setShowInternModal(false)} />}
    </div>
  );
}

/* --- Reusable Components --- */
const StatCard = ({ label, value }) => (
  <div className="bg-cardDark p-4 rounded border border-primaryDark shadow text-center">
    <p className="text-xl font-bold">{value}</p>
    <p className="text-gray-400">{label}</p>
  </div>
);

const ActionButton = ({ label, color, text="white", onClick }) => {
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

const ProgressBar = ({ percent }) => (
  <div className="w-40 text-right">
    <p className="text-sm text-gray-300 mb-1">{percent}% complete</p>
    <div className="h-3 bg-gray-700 rounded">
      <div className="h-3 bg-accent rounded" style={{ width: `${percent}%` }} />
    </div>
  </div>
);

const Tooltip = ({ task, formatDate }) => (
  <div className="fixed z-50 p-4 bg-cardDark/80 backdrop-blur-sm border border-primaryDark rounded-lg shadow-xl animate-fadeIn pointer-events-none"
       style={{ top: window.event?.clientY + 15, left: window.event?.clientX + 15 }}>
    <h4 className="font-bold text-accent">{task.title}</h4>
    <p className="text-sm text-gray-300">{task.description}</p>
    <p>Status: {task.status}</p>
    <p>Due: {formatDate(task.dueDate)}</p>
    <ProgressBar percent={task.percent} />
  </div>
);

const Modal = ({ title, children, onClose }) => {
  useEffect(() => { document.body.classList.add("overflow-hidden"); return () => document.body.classList.remove("overflow-hidden"); }, []);
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-cardDark rounded border border-primaryDark p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-accent">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

/* --- Manage Tasks Modal --- */
const ManageTasksModal = ({ tasks, editTaskId, setEditTaskId, handleAddTask, handleRemoveTask, handleSaveTask, onClose }) => {
  return (
    <Modal title="Manage Tasks" onClose={onClose}>
      {tasks.length ? tasks.map((task) =>
        editTaskId === task.id
          ? <TaskForm key={task.id} task={task} onSave={handleSaveTask} onCancel={() => setEditTaskId(null)} />
          : <div key={task.id} className="p-4 bg-cardDark border border-primaryDark rounded flex justify-between items-center mb-2">
              <div>
                <h4 className="font-bold">{task.title}</h4>
                <p className="text-gray-400 text-sm">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditTaskId(task.id)} className="bg-success px-3 py-1 rounded text-black font-semibold">Edit</button>
                <button onClick={() => handleRemoveTask(task.id)} className="bg-error px-3 py-1 rounded text-white font-semibold">Remove</button>
              </div>
            </div>
      ) : <p className="text-gray-400">No tasks</p>}
      <div className="mt-4"><button onClick={handleAddTask} className="bg-primary px-4 py-2 rounded text-white font-bold">Add Task</button></div>
    </Modal>
  );
};

const TaskForm = ({ task, onSave, onCancel }) => {
  const [form, setForm] = useState(task);
  return (
    <div className="p-4 bg-cardDark border border-primaryDark rounded space-y-2 mb-2">
      <input className="w-full p-2 bg-baseDark border border-primaryDark rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea className="w-full p-2 bg-baseDark border border-primaryDark rounded" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input type="date" className="w-full p-2 bg-baseDark border border-primaryDark rounded" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="bg-success px-4 py-1 rounded text-black font-bold">Save</button>
        <button onClick={onCancel} className="bg-error px-4 py-1 rounded text-white font-bold">Cancel</button>
      </div>
    </div>
  );
};

/* --- Assign Tasks Modal --- */
const AssignTasksModal = ({ interns, tasks, assignTaskInfo, setAssignTaskInfo, handleAssignTask, onClose }) => {
  return (
    <Modal title="Assign Tasks to Interns" onClose={onClose}>
      <select className="w-full p-2 mb-2 bg-baseDark border border-primaryDark rounded" value={assignTaskInfo.internId} onChange={(e) => setAssignTaskInfo({ ...assignTaskInfo, internId: e.target.value })}>
        <option value="">Select Intern</option>
        {interns.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
      </select>
      <select className="w-full p-2 mb-4 bg-baseDark border border-primaryDark rounded" value={assignTaskInfo.taskId} onChange={(e) => setAssignTaskInfo({ ...assignTaskInfo, taskId: e.target.value })}>
        <option value="">Select Task</option>
        {tasks.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
      </select>
      <button onClick={handleAssignTask} className="bg-accent text-black font-bold rounded px-4 py-2 hover:bg-yellow-400">Assign</button>
    </Modal>
  );
};

/* --- Manage Intern Modal --- */
const ManageInternModal = ({ interns, handleAddOrEditIntern, handleRemoveIntern, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", university: "", startDate: "", endDate: "" });

  const save = () => {
    if (!form.name || !form.email) return;
    handleAddOrEditIntern(editing ? { ...form, id: editing } : { ...form, id: `intern-${Date.now()}`, role: "intern" });
    setForm({ name: "", email: "", university: "", startDate: "", endDate: "" });
    setShowForm(false);
    setEditing(null);
  };

  return (
    <Modal title="Manage Interns" onClose={onClose}>
      {interns.length ? interns.map((i) => (
        <div key={i.id} className="p-4 bg-cardDark border border-primaryDark rounded flex justify-between mb-2">
          <div><h4 className="font-bold">{i.name}</h4><p className="text-sm">{i.university}</p></div>
          <div className="flex gap-2">
            <button onClick={() => { setForm(i); setEditing(i.id); setShowForm(true); }} className="bg-success px-3 py-1 rounded text-black">Edit</button>
            <button onClick={() => handleRemoveIntern(i.id)} className="bg-error px-3 py-1 rounded text-white">Remove</button>
          </div>
        </div>
      )) : <p className="text-gray-400">No interns</p>}

      {!showForm && <div className="mt-4"><button onClick={() => setShowForm(true)} className="bg-accent px-4 py-2 rounded text-black font-bold">Add Intern</button></div>}

      {showForm && (
        <div className="mt-4 p-4 bg-cardDark rounded border border-primaryDark space-y-3">
          <input placeholder="Name" className="w-full p-2 bg-baseDark border border-primaryDark rounded" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" className="w-full p-2 bg-baseDark border border-primaryDark rounded" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input placeholder="University" className="w-full p-2 bg-baseDark border border-primaryDark rounded" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} />
          <div className="flex gap-2">
            <input type="date" className="w-1/2 p-2 bg-baseDark border border-primaryDark rounded" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <input type="date" className="w-1/2 p-2 bg-baseDark border border-primaryDark rounded" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <button onClick={save} className="bg-primary px-4 py-2 rounded text-white font-bold">{editing ? "Save Changes" : "Add"}</button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="bg-error px-4 py-2 rounded text-white font-bold">Cancel</button>
          </div>
        </div>
      )}
    </Modal>
  );
};
