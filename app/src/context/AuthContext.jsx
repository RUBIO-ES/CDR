import { createContext, useContext, useState } from 'react';

// Creamos el objeto Contexto
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  const login = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook estándar para cuando SI estás dentro del Provider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};