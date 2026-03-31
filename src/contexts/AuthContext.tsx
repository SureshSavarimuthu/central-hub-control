import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { dummyUsers, dummyHubs } from '@/data/dummy';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  loginWithAccessKey: (hubCode: string, accessKey: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  isKitchen: boolean;
  isWarehouse: boolean;
  userHub: typeof dummyHubs[0] | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(dummyUsers[0]); // default admin

  const login = (email: string, _password: string) => {
    const found = dummyUsers.find(u => u.email === email);
    if (found) { setUser(found); return true; }
    return false;
  };

  const loginWithAccessKey = (hubCode: string, accessKey: string) => {
    const found = dummyUsers.find(u => u.accessKey === accessKey);
    if (found) { setUser(found); return true; }
    return false;
  };

  const logout = () => setUser(null);

  const isAdmin = user?.role === 'CENTRALHUB_ADMIN';
  const isKitchen = user?.role === 'KITCHEN_MANAGER' || user?.role === 'KITCHEN_STAFF';
  const isWarehouse = user?.role === 'WAREHOUSE_MANAGER' || user?.role === 'WAREHOUSE_STAFF';
  const userHub = user ? dummyHubs.find(h => h.id === user.hubId) || null : null;

  return (
    <AuthContext.Provider value={{ user, login, loginWithAccessKey, logout, isAdmin, isKitchen, isWarehouse, userHub }}>
      {children}
    </AuthContext.Provider>
  );
};
