import React from 'react';
import { 
  Container, Typography, Button, Stack, Box, Grid, Paper, Avatar, Modal, Fade, IconButton 
} from '@mui/material';
import { Link } from 'react-router-dom';

// Iconos
import ShieldMoonIcon from '@mui/icons-material/ShieldMoon';
import GroupsIcon from '@mui/icons-material/Groups';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';

const Landing = ({ openRick, setOpenRick }) => {

  const features = [
    { 
      title: 'Protección Avanzada', 
      desc: 'FinZen protege tu información con cifrado moderno y seguro.', 
      icon: <ShieldMoonIcon sx={{ fontSize: 42 }} />, 
      color: '#6366f1' 
    },
    { 
      title: 'Gestión Colaborativa', 
      desc: 'Comparte y controla tus finanzas con otros usuarios en tiempo real.', 
      icon: <GroupsIcon sx={{ fontSize: 42 }} />, 
      color: '#8b5cf6' 
    },
    { 
      title: 'Análisis Inteligente', 
      desc: 'Obtén métricas claras y reportes automáticos con FinZen.', 
      icon: <QueryStatsIcon sx={{ fontSize: 42 }} />, 
      color: '#10b981' 
    }
  ];

  const testimonios = [
    { 
      nombre: 'Carlos Gómez', 
      rol: 'Emprendedor', 
      comentario: '"Con FinZen ahora tengo control total de mis gastos."', 
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      nombre: 'Valentina López', 
      rol: 'Diseñadora', 
      comentario: '"FinZen es rápida, clara y muy útil."', 
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' 
    },
    { 
      nombre: 'David Torres', 
      rol: 'Freelancer', 
      comentario: '"Me ayudó a organizar mis ingresos mensuales fácilmente."', 
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop' 
    }
  ];

  const gradientText = {
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* HERO */}
      <Box sx={{ 
        background: 'radial-gradient(circle at 80% 20%, rgba(99,102,241,0.15), transparent)',
        pt: { xs: 10, md: 18 }, 
        pb: { xs: 10, md: 14 } 
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid xs={12}>
              <Stack spacing={3} alignItems="center" textAlign="center">

                <Typography variant="overline" sx={{ fontWeight: 800, color: '#6366f1', letterSpacing: 2 }}>
                  Plataforma Financiera Moderna
                </Typography>

                <Typography variant="h1" sx={{ 
                  fontWeight: 900, 
                  fontSize: { xs: '2.5rem', md: '5rem' },
                  lineHeight: 1.1
                }}>
                  Bienvenido a <span style={gradientText}>FinZen</span><br />
                  controla tu dinero sin complicaciones
                </Typography>

                <Typography sx={{ color: '#64748b', maxWidth: 600 }}>
                  FinZen te permite organizar ingresos, gastos y metas en un solo lugar con una experiencia rápida, clara y eficiente.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
                  <Button 
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/"
                    target="_blank"
                    sx={{ 
                      px: 5, py: 1.8, borderRadius: 3,
                      background: 'linear-gradient(90deg,#6366f1,#10b981)',
                      textTransform: 'none',
                      fontWeight: 700
                    }}
                  >
                    Ver Proyecto
                  </Button>

                  <Button 
                    variant="outlined"
                    component={Link}
                    to="/pricing"
                    sx={{ 
                      px: 5, py: 1.8, borderRadius: 3,
                      textTransform: 'none'
                    }}
                  >
                    Ver Planes
                  </Button>
                </Stack>

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box sx={{ py: { xs: 8, md: 14 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((item, index) => (
              <Grid xs={12} md={4} key={index}>
                <Paper sx={{ 
                  p: 5, 
                  borderRadius: 5,
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}>
                  <Box sx={{ color: item.color, mb: 2 }}>{item.icon}</Box>
                  <Typography fontWeight={800} mb={1}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIOS */}
      <Box sx={{ py: { xs: 8, md: 14 }, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" fontWeight={900} mb={6}>
            Usuarios de FinZen opinan
          </Typography>

          <Grid container spacing={4}>
            {testimonios.map((t, index) => (
              <Grid xs={12} md={4} key={index}>
                <Paper sx={{ p: 4, borderRadius: 5, textAlign: 'center' }}>
                  <Avatar src={t.foto} sx={{ width: 70, height: 70, mx: 'auto', mb: 2 }} />
                  <Typography fontWeight={700}>{t.nombre}</Typography>
                  <Typography variant="caption" color="text.secondary">{t.rol}</Typography>
                  <Typography variant="body2" mt={2} fontStyle="italic">
                    {t.comentario}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* MODAL */}
      <Modal open={openRick} onClose={() => setOpenRick(false)} closeAfterTransition>
        <Fade in={openRick}>
          <Box sx={{ 
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'white',
            p: 4,
            borderRadius: 4,
            textAlign: 'center'
          }}>
            <IconButton onClick={() => setOpenRick(false)} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>

            <Typography fontWeight={900} mb={2}>
              Portal FinZen desbloqueado 🚀
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Accede a contenido especial dentro del ecosistema FinZen.
            </Typography>

            <Button 
              variant="contained"
              component={Link}
              to="/RickMorty"
              onClick={() => setOpenRick(false)}
              sx={{ mt: 3, borderRadius: 3 }}
            >
              Ir ahora
            </Button>
          </Box>
        </Fade>
      </Modal>

    </Box>
  );
};

export default Landing;