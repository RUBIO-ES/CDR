import axios from 'axios';

// URL de tu servidor (Asegúrate de que el servidor esté corriendo en el puerto 5000)
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Servicio para manejar todas las peticiones a la API de Atlas
 */
const ApiService = {
  
  // 1. Registro de usuarios
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error en el registro';
    }
  },

  // 2. Inicio de sesión
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al iniciar sesión';
    }
  },

  // 3. Ejemplo de obtención de datos (si tuvieras una ruta protegida)
  getProfile: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error al obtener perfil';
    }
  }
};

export default Api;