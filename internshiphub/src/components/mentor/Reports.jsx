import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { DUMMY_TASKS, DUMMY_USERS } from "../../data/dummyData";

export default function Reports() {
  const statusData = [
    { name: "Completed", value: DUMMY_TASKS.filter(t => t.status === "completed").length },
    { name: "In Progress", value: DUMMY_TASKS.filter(t => t.status === "in-progress").length },
    { name: "Pending", value: DUMMY_TASKS.filter(t => t.status === "pending").length },
  ];
  const COLORS = ["#16a34a", "#facc15", "#9ca3af"];

  const interns = DUMMY_USERS.filter(u => u.role === "intern");
  const performanceData = interns.map(i => ({
    name: i.name,
    tasks: DUMMY_TASKS.filter(t => t.assignedTo === i.id && t.status === "completed").length
  }));

  return (
    <div className="bg-baseDark min-h-screen text-textLight p-8 grid md:grid-cols-2 gap-8">
      <div className="bg-cardDark p-6 rounded border border-primaryDark shadow">
        <h3 className="font-bold mb-4 text-accent">Task Status Distribution</h3>
        <PieChart width={300} height={300}>
          <Pie data={statusData} cx={150} cy={150} outerRadius={80} dataKey="value" label>
            {statusData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="#0a192f" />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#162447", border: "1px solid #2563eb", color: "#f1f5f9" }} />
        </PieChart>
      </div>

      <div className="bg-cardDark p-6 rounded border border-primaryDark shadow">
        <h3 className="font-bold mb-4 text-accent">Intern Performance</h3>
        <BarChart width={400} height={300} data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#f1f5f9"/>
          <YAxis stroke="#f1f5f9"/>
          <Tooltip contentStyle={{ backgroundColor: "#162447", border: "1px solid #2563eb", color: "#f1f5f9" }} />
          <Legend />
          <Bar dataKey="tasks" fill="#2563eb" />
        </BarChart>
      </div>
    </div>
  );
}
