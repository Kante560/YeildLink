// src/context/AuthContext/authTypes.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (name: string, phone: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
