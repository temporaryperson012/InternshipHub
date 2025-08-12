export const DUMMY_USERS = [
  { id: 'mentor1', email: 'mentor@example.com', password: 'mentor123', name: 'John Smith', role: 'mentor', department: 'IT', experience: '5 years' },
  { id: 'intern1', email: 'intern1@example.com', password: 'intern123', name: 'Sarah Johnson', role: 'intern', university: 'MIT', startDate: '2024-01-15', endDate: '2024-06-15', mentorId: 'mentor1' },
  { id: 'intern2', email: 'intern2@example.com', password: 'intern123', name: 'Mike Chen', role: 'intern', university: 'Stanford', startDate: '2024-02-01', endDate: '2024-07-01', mentorId: 'mentor1' },
  { id: 'intern3', email: 'kartik@example.com', password: 'intern123', name: 'Kartik Kumar', role: 'intern', university: 'XYZ University', startDate: '2025-07-07', endDate: '2025-08-13', mentorId: 'mentor1' },
];

export const DUMMY_TASKS = [
  { id: 'task1', title: 'Setup Development Environment', description: 'Install Node.js, VS Code, and Git', mentorId: 'mentor1', assignedTo: 'intern1', status: 'completed', priority: 'high', dueDate: '2024-01-20', createdAt: '2024-01-15' },
  { id: 'task2', title: 'Learn React Fundamentals', description: 'Complete React tutorial and build a todo app', mentorId: 'mentor1', assignedTo: 'intern1', status: 'in-progress', priority: 'medium', dueDate: '2024-02-01', createdAt: '2024-01-16' },
  { id: 'task3', title: 'Database Design Project', description: 'Design database schema for e-commerce app', mentorId: 'mentor1', assignedTo: 'intern2', status: 'pending', priority: 'low', dueDate: '2024-02-15', createdAt: '2024-01-18' },
  { id: 'task4', title: 'Intern Management Project', description: 'Design a complete SAAS for Intern Management App', mentorId: 'mentor1', assignedTo: 'intern3', status: 'Completed', priority: 'high', dueDate: '2025-08-12', createdAt: '2025-08-10' }
];
