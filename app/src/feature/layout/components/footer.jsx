import React, { memo } from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = memo(() => {

  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: '#e2e8f0',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        
        <Grid container spacing={4} justifyContent="space-between">
          
          {/* LOGO */}
          <Grid xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(90deg,#6366f1,#10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              FinZen 💸
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 300 }}>
              Gestiona tus finanzas de forma simple, rápida y moderna.
            </Typography>
          </Grid>

          {/* NAVEGACIÓN */}
          <Grid xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
              Navegación
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" underline="none" sx={{ color: '#cbd5f5', '&:hover': { color: '#fff' } }}>
                Inicio
              </Link>
              <Link href="/pricing" underline="none" sx={{ color: '#cbd5f5', '&:hover': { color: '#fff' } }}>
                Planes
              </Link>
            </Box>
          </Grid>

          {/* REDES */}
          <Grid xs={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
              Síguenos
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#cbd5f5',
                  '&:hover': { color: '#6366f1' }
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>

              <IconButton 
                size="small" 
                sx={{ 
                  color: '#cbd5f5',
                  '&:hover': { color: '#6366f1' }
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="caption" sx={{ mt: 2, display: 'block', opacity: 0.6 }}>
              contacto@finzen.app
            </Typography>
          </Grid>

        </Grid>

        {/* COPYRIGHT */}
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            mt: 4, 
            pt: 3, 
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            © {new Date().getFullYear()} FinZen — Todos los derechos reservados.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
});

export default Footer;