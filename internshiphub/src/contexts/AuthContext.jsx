import { createContext, useContext, useState } from "react";
import { DUMMY_USERS } from "../data/dummyData";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(DUMMY_USERS);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      toast.success(`Welcome, ${foundUser.name}`);
      return foundUser;
    } else {
      toast.error("Invalid email or password");
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out");
  };

  // Add new user to users list
  const addUser = (newUser) => {
    // Check duplicate email
    if (users.some(u => u.email === newUser.email)) {
      toast.error("This email is already registered.");
      return false;
    }
    setUsers([...users, newUser]);
    toast.success("Account created successfully! Please log in.");
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, addUser }}>
      {children}
    </AuthContext.Provider>
  );
}
