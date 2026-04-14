import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth2 = () => {
  const context = useContext(AuthContext);

  // Si no hay contexto (porque no hay Provider arriba), devolvemos valores seguros
  return context || { 
    isAuthenticated: false, 
    user: null, 
    logout: () => console.warn("AuthProvider no encontrado"),
    login: () => console.warn("AuthProvider no encontrado")
  };
};

export default useAuth2;