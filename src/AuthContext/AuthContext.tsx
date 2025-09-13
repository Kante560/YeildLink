// src/context/AuthContext/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "../AuthContext/authTypes";
import { loginRequest, signupRequest } from "../AuthContext/authservice";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);


  const login = async (identifier: string, password: string) => {
    const data = await loginRequest(identifier, password);
    const authUser: User = { ...data.user, token: data.token };
    setUser(authUser);
    localStorage.setItem("authUser", JSON.stringify(authUser));
  };

  const signup = async (name: string, phone: string, email: string, password: string) => {
    const data = await signupRequest(name, phone, email, password);
    const authUser: User = { ...data.user, token: data.token };
    setUser(authUser);
    localStorage.setItem("authUser", JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
  <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
