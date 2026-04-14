import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Componentes
import Navbar from './feature/layout/components/Navbar';
import Footer from './feature/layout/components/Footer'; 
import Landing from './feature/layout/components/Landing';
import Dashboard from './feature/dashboard/Dashboard';
import Login from './feature/auth/components/Login';
import Pricing from './feature/layout/components/Pricing';
import RickMorty from './shared/components/RickMorty';

function App() {
  const [openRick, setOpenRick] = useState(false);
  const planesRef = useRef(null);

  return (
    <Router>
      {/* Contenedor principal para que el footer se mantenga abajo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Navbar onOpenRick={() => setOpenRick(true)} />
        
        {/* CAPA DEL BUSCADOR: Solo existe si openRick es true */}
        {openRick && (
          <Box sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            zIndex: 9999, 
            backgroundColor: '#ffffff', 
            overflowY: 'auto',
            pt: 8 
          }}>
            <IconButton 
              onClick={() => setOpenRick(false)} 
              sx={{ position: 'fixed', top: 20, right: 20, backgroundColor: '#f1f5f9', '&:hover': { backgroundColor: '#e2e8f0' } }}
            >
              <CloseIcon />
            </IconButton>
            
            <RickMorty />
          </Box>
        )}

        {/* El contenido principal crece para empujar al footer */}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Landing planesRef={planesRef} />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>

        {/* Footer al final de la estructura */}
        <Footer />
        
      </Box>
    </Router>
  );
}

export default App;