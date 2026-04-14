import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Box, TextField, Button, Typography, Paper, Alert, Link, Fade, Stack 
} from '@mui/material';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMsg('');

    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres");
      return;
    }

    const url = isRegister ? 'register' : 'login';
    
    try {
      const res = await axios.post(`http://localhost:5000/api/${url}`, { 
        email: email.trim(), 
        password: password.trim() 
      });

      if (isRegister) {
        setMsg("Registro exitoso. ¡Ahora puedes iniciar sesión!");
        setIsRegister(false);
      } else {
        localStorage.setItem('userSession', JSON.stringify(res.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error de conexión con el servidor");
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #020617, #0f172a)'
      }}
    >
      <Fade in timeout={700}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 5, 
            borderRadius: 5, 
            width: '100%', 
            maxWidth: 420,
            backdropFilter: 'blur(12px)',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >

          <Stack spacing={2} alignItems="center" mb={2}>
            <Typography 
              variant="h5" 
              fontWeight={900}
              sx={{
                background: 'linear-gradient(90deg,#6366f1,#22c55e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {isRegister ? 'Crear cuenta en FinZen' : 'FinZen'}
            </Typography>

            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              {isRegister 
                ? 'Regístrate y empieza a gestionar tus finanzas de forma inteligente'
                : 'Bienvenido de nuevo 👋'}
            </Typography>
          </Stack>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {msg && <Alert severity="success" sx={{ mb: 2 }}>{msg}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              label="Correo electrónico" 
              margin="normal" 
              type="email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required 
              sx={{
                input: { color: '#e2e8f0' },
                label: { color: '#94a3b8' }
              }}
            />

            <TextField 
              fullWidth 
              label="Contraseña" 
              type="password" 
              margin="normal" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              required 
              sx={{
                input: { color: '#e2e8f0' },
                label: { color: '#94a3b8' }
              }}
            />

            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              sx={{ 
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: 'none',
                background: 'linear-gradient(90deg,#6366f1,#22c55e)',
                '&:hover': { opacity: 0.9 }
              }}
            >
              {isRegister ? 'Crear cuenta' : 'Ingresar'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link 
              component="button" 
              variant="body2" 
              onClick={() => setIsRegister(!isRegister)}
              sx={{ fontWeight: 600, color: '#cbd5f5' }}
            >
              {isRegister 
                ? "¿Ya tienes cuenta? Inicia sesión" 
                : "¿No tienes cuenta? Regístrate"}
            </Link>
          </Box>

        </Paper>
      </Fade>
    </Box>
  );
};

export default Login;