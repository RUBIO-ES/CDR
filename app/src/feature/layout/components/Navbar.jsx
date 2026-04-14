import React, { useState, memo } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  Grid, Link as MuiLink, IconButton, Drawer, List, 
  ListItem, ListItemButton, ListItemText 
} from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth2 from '../../../hooks/useAuth'; 

// --- FOOTER ---
const Footer = memo(() => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: '#e2e8f0', 
        py: 5,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          
          <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'left' }}>
            <Typography variant="h6" fontWeight={900}>
              FinZen 💸
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Controla tu dinero, construye tu futuro.
            </Typography>
          </Grid>

          <Grid item xs={12} md={8} textAlign={{ xs: 'center', md: 'right' }}>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <MuiLink href="#" underline="hover" sx={{ color: '#cbd5f5' }}>Privacidad</MuiLink>
              <MuiLink href="#" underline="hover" sx={{ color: '#cbd5f5' }}>Términos</MuiLink>
              <MuiLink href="#" underline="hover" sx={{ color: '#cbd5f5' }}>Soporte</MuiLink>
            </Box>

            <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.5 }}>
              © {new Date().getFullYear()} FinZen
            </Typography>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
});


// --- NAVBAR ---
const Navbar = ({ onOpenRick }) => {
  const { user, logout } = useAuth2();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = location.pathname === '/dashboard';

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h6" fontWeight={900} mb={2}>
        FinZen 💸
      </Typography>

      <List>
        {!isDashboard && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/'); setMobileOpen(false); }}>
                <ListItemText primary="Inicio" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => { navigate('/pricing'); setMobileOpen(false); }}>
                <ListItemText primary="Planes" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => { onOpenRick(); setMobileOpen(false); }}>
                <ListItemText 
                  primary={
                    <Typography sx={{ color: '#6366f1', fontWeight: 'bold' }}>
                      Rick & Morty
                    </Typography>
                  } 
                />
              </ListItemButton>
            </ListItem>
          </>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={user || isDashboard ? handleLogout : () => navigate('/login')}>
            <ListItemText 
              primary={
                <Typography sx={{ color: (user || isDashboard) ? '#ef4444' : '#111827' }}>
                  {user || isDashboard ? "Cerrar sesión" : "Acceder"}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(10px)',
          color: '#111827',
          boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 10 } }}>
          
          <Typography 
            variant="h6" 
            onClick={() => navigate('/')} 
            sx={{ 
              fontWeight: 900, 
              cursor: 'pointer',
              background: 'linear-gradient(90deg,#6366f1,#10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            FinZen
          </Typography>

          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            
            {!isDashboard && (
              <>
                <Button component={Link} to="/" sx={{ color: '#374151', textTransform: 'none' }}>
                  Inicio
                </Button>

                <Button component={Link} to="/pricing" sx={{ color: '#374151', textTransform: 'none' }}>
                  Planes
                </Button>

                <Button 
                  onClick={onOpenRick} 
                  sx={{ 
                    color: '#6366f1', 
                    fontWeight: 700,
                    textTransform: 'none'
                  }}
                >
                  Rick & Morty
                </Button>
              </>
            )}

            <Button 
              onClick={user || isDashboard ? handleLogout : () => navigate('/login')}
              variant="contained"
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 3,
                px: 3,
                background: (user || isDashboard)
                  ? '#fee2e2'
                  : 'linear-gradient(90deg,#6366f1,#10b981)',
                color: (user || isDashboard) ? '#ef4444' : 'white',
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              {user || isDashboard ? "Cerrar sesión" : "Acceder"}
            </Button>

          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export { Footer };
export default Navbar;