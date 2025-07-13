
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isLoggedIn, getCurrentUser, logout } from '@/services/authService';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const refreshUser = () => {
    const authenticated = isLoggedIn();
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } else {
      setUser(null);
    }
  };

  const handleLogout = () => {
    logout();
    refreshUser();
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        logout: handleLogout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
