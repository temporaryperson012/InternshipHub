import { DUMMY_USERS } from "../../data/dummyData";

export default function InternManagement() {
  const interns = DUMMY_USERS.filter((u) => u.role === "intern");

  return (
    <div className="bg-baseDark min-h-screen text-textLight p-8">
      <h2 className="text-xl font-bold mb-6 text-accent">Intern Management</h2>
      <table className="min-w-full bg-cardDark rounded border border-primaryDark">
        <thead>
          <tr className="bg-primaryDark text-white">
            <th className="px-4 py-2 border border-primaryDark">Name</th>
            <th className="px-4 py-2 border border-primaryDark">University</th>
            <th className="px-4 py-2 border border-primaryDark">Duration</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern.id} className="hover:bg-primaryDark/30 transition">
              <td className="border border-primaryDark px-4 py-2">{intern.name}</td>
              <td className="border border-primaryDark px-4 py-2">{intern.university}</td>
              <td className="border border-primaryDark px-4 py-2">{intern.startDate} → {intern.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
