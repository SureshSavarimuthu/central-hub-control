import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { dummyUsers, dummyHubs } from '@/data/dummy';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  loginWithAccessKey: (hubCode: string, accessKey: string) => boolean;
  logout: () => void;
  isKitchen: boolean;
  isWarehouse: boolean;
  userHub: typeof dummyHubs[0] | null;
  getDefaultRoute: () => string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

const getRouteForRole = (role: UserRole): string => {
  switch (role) {
    case 'KITCHEN_MANAGER':
    case 'KITCHEN_STAFF':
      return '/kitchen/dashboard';
    case 'WAREHOUSE_MANAGER':
    case 'WAREHOUSE_STAFF':
      return '/warehouse/dashboard';
    default:
      return '/kitchen/dashboard';
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // no default user — must login

  const login = (email: string, _password: string) => {
    const found = dummyUsers.find(u => u.email === email && u.role !== 'CENTRALHUB_ADMIN');
    if (found) { setUser(found); return true; }
    return false;
  };

  const loginWithAccessKey = (hubCode: string, accessKey: string) => {
    const found = dummyUsers.find(u => u.accessKey === accessKey && u.role !== 'CENTRALHUB_ADMIN');
    if (found) { setUser(found); return true; }
    return false;
  };

  const logout = () => setUser(null);

  const isKitchen = user?.role === 'KITCHEN_MANAGER' || user?.role === 'KITCHEN_STAFF';
  const isWarehouse = user?.role === 'WAREHOUSE_MANAGER' || user?.role === 'WAREHOUSE_STAFF';
  const userHub = user ? dummyHubs.find(h => h.id === user.hubId) || null : null;

  const getDefaultRoute = () => user ? getRouteForRole(user.role) : '/auth/login';

  return (
    <AuthContext.Provider value={{ user, login, loginWithAccessKey, logout, isKitchen, isWarehouse, userHub, getDefaultRoute }}>
      {children}
    </AuthContext.Provider>
  );
};
