// export const DUMMY_USERS = [
//   { id: 'mentor1', email: 'mentor@example.com', password: 'mentor123', name: 'John Smith', role: 'mentor', department: 'IT', experience: '5 years' },
//   { id: 'intern1', email: 'intern1@example.com', password: 'intern123', name: 'Sarah Johnson', role: 'intern', university: 'MIT', startDate: '2024-01-15', endDate: '2024-06-15', mentorId: 'mentor1' },
//   { id: 'intern2', email: 'intern2@example.com', password: 'intern123', name: 'Mike Chen', role: 'intern', university: 'Stanford', startDate: '2024-02-01', endDate: '2024-07-01', mentorId: 'mentor1' },
// ];

// export const DUMMY_TASKS = [
//   { id: 'task1', title: 'Setup Development Environment', description: 'Install Node.js, VS Code, and Git', mentorId: 'mentor1', assignedTo: 'intern1', status: 'completed', priority: 'high', dueDate: '2024-01-20', createdAt: '2024-01-15' },
//   { id: 'task2', title: 'Learn React Fundamentals', description: 'Complete React tutorial and build a todo app', mentorId: 'mentor1', assignedTo: 'intern1', status: 'in-progress', priority: 'medium', dueDate: '2024-02-01', createdAt: '2024-01-16' },
//   { id: 'task3', title: 'Database Design Project', description: 'Design database schema for e-commerce app', mentorId: 'mentor1', assignedTo: 'intern2', status: 'pending', priority: 'low', dueDate: '2024-02-15', createdAt: '2024-01-18' },
//   { id: 'task4', title: 'Intern Management Project', description: 'Design a complete SAAS for Intern Management App', mentorId: 'mentor1', assignedTo: 'intern3', status: 'Completed', priority: 'high', dueDate: '2025-08-11', createdAt: '2025-08-10' }
// ];
export const DUMMY_USERS = [
  // ==== Mentors ====
  { id: 'mentor1', email: 'mentor1@example.com', password: 'mentor123', name: 'John Smith', role: 'mentor', department: 'IT', experience: '5 years' },
  { id: 'mentor2', email: 'mentor2@example.com', password: 'mentor123', name: 'Priya Sharma', role: 'mentor', department: 'Data Science', experience: '8 years' },
  { id: 'mentor3', email: 'mentor3@example.com', password: 'mentor123', name: 'Rajesh Kumar', role: 'mentor', department: 'Electronics', experience: '6 years' },

  // ==== Interns for Mentor 1 ====
  { id: 'intern1', email: 'intern1@example.com', password: 'intern123', name: 'Sarah Johnson', role: 'intern', university: 'MIT', startDate: '2024-01-15', endDate: '2024-06-15', mentorId: 'mentor1' },
  { id: 'intern2', email: 'intern2@example.com', password: 'intern123', name: 'Mike Chen', role: 'intern', university: 'Stanford', startDate: '2024-02-01', endDate: '2024-07-01', mentorId: 'mentor1' },
  { id: 'intern3', email: 'intern3@example.com', password: 'intern123', name: 'Emily Davis', role: 'intern', university: 'Harvard', startDate: '2024-03-01', endDate: '2024-08-01', mentorId: 'mentor1' },

  // ==== Interns for Mentor 2 ====
  { id: 'intern4', email: 'intern4@example.com', password: 'intern123', name: 'Arjun Mehta', role: 'intern', university: 'IIT Bombay', startDate: '2024-01-20', endDate: '2024-06-20', mentorId: 'mentor2' },
  { id: 'intern5', email: 'intern5@example.com', password: 'intern123', name: 'Lisa Ray', role: 'intern', university: 'IIT Delhi', startDate: '2024-02-10', endDate: '2024-07-10', mentorId: 'mentor2' },
  { id: 'intern6', email: 'intern6@example.com', password: 'intern123', name: 'David Lee', role: 'intern', university: 'IIT Madras', startDate: '2024-03-05', endDate: '2024-08-05', mentorId: 'mentor2' },

  // ==== Interns for Mentor 3 ====
  { id: 'intern7', email: 'intern7@example.com', password: 'intern123', name: 'Neha Kapoor', role: 'intern', university: 'NIT Trichy', startDate: '2024-01-25', endDate: '2024-06-25', mentorId: 'mentor3' },
  { id: 'intern8', email: 'intern8@example.com', password: 'intern123', name: 'Tarun Singh', role: 'intern', university: 'BITS Pilani', startDate: '2024-02-15', endDate: '2024-07-15', mentorId: 'mentor3' },
  { id: 'intern9', email: 'intern9@example.com', password: 'intern123', name: 'Sophia Wilson', role: 'intern', university: 'IIT Kanpur', startDate: '2024-03-08', endDate: '2024-08-08', mentorId: 'mentor3' },
];

export const DUMMY_TASKS = [
  // ==== Tasks for Mentor 1 Interns ====
  { id: 'task1', title: 'Setup Development Environment', description: 'Install Node.js, VS Code, and Git', mentorId: 'mentor1', assignedTo: 'intern1', status: 'completed', priority: 'high', dueDate: '2024-01-20', createdAt: '2024-01-15' },
  { id: 'task2', title: 'Learn React Fundamentals', description: 'Complete React tutorial and build a todo app', mentorId: 'mentor1', assignedTo: 'intern1', status: 'in-progress', priority: 'medium', dueDate: '2024-02-01', createdAt: '2024-01-16' },
  { id: 'task3', title: 'Database Design Project', description: 'Design database schema for e-commerce app', mentorId: 'mentor1', assignedTo: 'intern2', status: 'pending', priority: 'low', dueDate: '2024-02-15', createdAt: '2024-01-18' },
  { id: 'task4', title: 'API Integration', description: 'Integrate backend APIs with frontend', mentorId: 'mentor1', assignedTo: 'intern2', status: 'completed', priority: 'high', dueDate: '2024-03-01', createdAt: '2024-02-10' },
  { id: 'task5', title: 'UI/UX Design Fixes', description: 'Improve dashboard layouts and mobile compatibility', mentorId: 'mentor1', assignedTo: 'intern3', status: 'in-progress', priority: 'medium', dueDate: '2024-03-15', createdAt: '2024-03-01' },

  // ==== Tasks for Mentor 2 Interns ====
  { id: 'task6', title: 'Data Cleaning Script', description: 'Write Python script to clean raw dataset', mentorId: 'mentor2', assignedTo: 'intern4', status: 'pending', priority: 'high', dueDate: '2024-01-28', createdAt: '2024-01-20' },
  { id: 'task7', title: 'Machine Learning Basics', description: 'Complete ML course and submit notes', mentorId: 'mentor2', assignedTo: 'intern4', status: 'completed', priority: 'medium', dueDate: '2024-02-15', createdAt: '2024-02-01' },
  { id: 'task8', title: 'Data Visualization Project', description: 'Create dashboards in PowerBI/Tableau', mentorId: 'mentor2', assignedTo: 'intern5', status: 'in-progress', priority: 'low', dueDate: '2024-03-10', createdAt: '2024-02-20' },
  { id: 'task9', title: 'Research Paper Summary', description: 'Summarize latest AI research papers', mentorId: 'mentor2', assignedTo: 'intern6', status: 'pending', priority: 'medium', dueDate: '2024-04-01', createdAt: '2024-03-01' },

  // ==== Tasks for Mentor 3 Interns ====
  { id: 'task10', title: 'Circuit Design', description: 'Design a circuit for smart home device', mentorId: 'mentor3', assignedTo: 'intern7', status: 'completed', priority: 'high', dueDate: '2024-02-25', createdAt: '2024-02-10' },
  { id: 'task11', title: 'Embedded Systems Practice', description: 'Write C programs for microcontroller', mentorId: 'mentor3', assignedTo: 'intern7', status: 'in-progress', priority: 'medium', dueDate: '2024-03-15', createdAt: '2024-03-01' },
  { id: 'task12', title: 'IoT Sensor Integration', description: 'Integrate temperature & motion sensors', mentorId: 'mentor3', assignedTo: 'intern8', status: 'pending', priority: 'low', dueDate: '2024-03-25', createdAt: '2024-03-10' },
  { id: 'task13', title: 'PCB Schematic Design', description: 'Design PCB schematic for automation system', mentorId: 'mentor3', assignedTo: 'intern9', status: 'in-progress', priority: 'high', dueDate: '2024-04-05', createdAt: '2024-03-20' },
];
