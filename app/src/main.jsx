import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// IMPORTANTE: Importamos el Provider desde la carpeta context
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e293b', // Navy Slate
      light: '#334155',
    },
    secondary: {
      main: '#4f46e5', // Indigo para botones de acción
    },
    background: {
      default: '#f8fafc', // Fondo grisáceo muy limpio
      paper: '#ffffff',
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "system-ui", sans-serif',
    h4: { fontWeight: 800, color: '#0f172a' },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { padding: '10px 20px' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { border: '1px solid #e2e8f0' }, // Bordes finos modernos
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos con el Provider de Autenticación */}
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);