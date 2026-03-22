import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PlanTier } from './mock-data';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'user' | 'super_admin';
  companyName: string;
  category: string;
  city: string;
  plan: PlanTier;
  planStatus: 'active' | 'trial' | 'expired';
  trialEndsAt?: string;
  createdAt: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (data: SignupData) => { success: boolean; error?: string };
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  updateUserById: (id: string, data: Partial<User>) => void;
  deleteUserById: (id: string) => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
  companyName: string;
  category: string;
  city: string;
  plan: PlanTier;
}

const ADMIN_EMAIL = 'admin@pertodemim.com.br';
const ADMIN_PASSWORD = 'admin123';

const defaultAdmin: User = {
  id: 'admin-1',
  email: ADMIN_EMAIL,
  name: 'Super Admin',
  phone: '(11) 99999-0000',
  role: 'super_admin',
  companyName: 'Perto de Mim Brasil',
  category: 'Tecnologia',
  city: 'São Paulo',
  plan: 'premium',
  planStatus: 'active',
  createdAt: '2024-01-01',
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('pdm_user');
    if (stored) setUser(JSON.parse(stored));
    const storedUsers = localStorage.getItem('pdm_users');
    if (storedUsers) {
      const parsed = JSON.parse(storedUsers) as User[];
      if (!parsed.find(u => u.email === ADMIN_EMAIL)) parsed.push(defaultAdmin);
      setUsers(parsed);
    } else {
      setUsers([defaultAdmin]);
    }
  }, []);

  const persistUsers = (u: User[]) => {
    setUsers(u);
    localStorage.setItem('pdm_users', JSON.stringify(u));
  };

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser(defaultAdmin);
      localStorage.setItem('pdm_user', JSON.stringify(defaultAdmin));
      return { success: true };
    }
    const passwords: Record<string, string> = JSON.parse(localStorage.getItem('pdm_passwords') || '{}');
    const found = users.find(u => u.email === email);
    if (found && passwords[email] === password) {
      setUser(found);
      localStorage.setItem('pdm_user', JSON.stringify(found));
      return { success: true };
    }
    return { success: false, error: 'Email ou senha incorretos.' };
  };

  const signup = (data: SignupData) => {
    if (users.find(u => u.email === data.email)) {
      return { success: false, error: 'Este email já está cadastrado.' };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: 'user',
      companyName: data.companyName,
      category: data.category,
      city: data.city,
      plan: data.plan,
      planStatus: data.plan === 'smart' ? 'active' : 'trial',
      trialEndsAt: data.plan !== 'smart' ? new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0] : undefined,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const passwords: Record<string, string> = JSON.parse(localStorage.getItem('pdm_passwords') || '{}');
    passwords[data.email] = data.password;
    localStorage.setItem('pdm_passwords', JSON.stringify(passwords));
    const updated = [...users, newUser];
    persistUsers(updated);
    setUser(newUser);
    localStorage.setItem('pdm_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pdm_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('pdm_user', JSON.stringify(updated));
    persistUsers(users.map(u => u.id === updated.id ? updated : u));
  };

  const updateUserById = (id: string, data: Partial<User>) => {
    persistUsers(users.map(u => u.id === id ? { ...u, ...data } : u));
    if (user?.id === id) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('pdm_user', JSON.stringify(updated));
    }
  };

  const deleteUserById = (id: string) => {
    persistUsers(users.filter(u => u.id !== id));
    if (user?.id === id) logout();
  };

  return (
    <AuthContext.Provider value={{ user, users, login, signup, logout, updateUser, updateUserById, deleteUserById }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
