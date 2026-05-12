import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    apiFetch("/auth/me")
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user");
      });
  }, []);

  const login = async (email, password) => {
    const data = await apiFetch("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data.data.user);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    return data;
  };

  const register = async (name, email, password) => {
    const data = await apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setUser(data.data.user);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    return data;
  };

  const logout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook tiện dụng
export const useAuth = () => useContext(AuthContext);
