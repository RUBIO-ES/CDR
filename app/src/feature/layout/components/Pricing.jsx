import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Switch,
  Stack,
  Chip,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: 0,
      desc: 'Empieza en FinZen y organiza tus finanzas sin costo.',
      features: [
        '50 movimientos al mes',
        '1 cuenta conectada',
        'Soporte básico'
      ],
      btn: 'Comenzar',
      pro: false
    },
    {
      name: 'Pro',
      price: isYearly ? 10 : 15,
      desc: 'Potencia tu experiencia en FinZen con herramientas avanzadas.',
      features: [
        'Movimientos ilimitados',
        'Predicciones inteligentes',
        'Reportes automáticos',
        'Soporte prioritario'
      ],
      btn: 'Prueba gratis',
      pro: true
    },
    {
      name: 'Team',
      price: isYearly ? 24 : 35,
      desc: 'FinZen para equipos pequeños que necesitan control total.',
      features: [
        'Hasta 5 usuarios',
        'Integración API',
        'Control de gastos',
        'Exportaciones avanzadas'
      ],
      btn: 'Contactar',
      pro: false
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      
      {/* Header */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
          Planes de FinZen
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Ahorra un 30% eligiendo facturación anual
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Typography fontWeight={!isYearly ? 700 : 400}>Mensual</Typography>

          <Switch
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
            color="success"
          />

          <Typography fontWeight={isYearly ? 700 : 400}>Anual</Typography>

          {isYearly && (
            <Chip label="-30%" color="success" size="small" sx={{ fontWeight: 'bold' }} />
          )}
        </Stack>
      </Box>

      {/* Plans */}
      <Grid container spacing={4}>
        {plans.map((plan) => (
          <Grid key={plan.name} xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                border: plan.pro ? '2px solid #10b981' : '1px solid #e2e8f0',
                boxShadow: plan.pro
                  ? '0 20px 25px -5px rgb(16 185 129 / 0.1)'
                  : 'none',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-6px)'
                }
              }}
            >
              {plan.pro && (
                <Chip
                  label="RECOMENDADO"
                  color="success"
                  sx={{ alignSelf: 'flex-start', mb: 2, fontWeight: 'bold' }}
                />
              )}

              <Typography variant="h5" fontWeight={800}>
                {plan.name}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                {plan.desc}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                <Typography variant="h3" fontWeight={900}>
                  ${plan.price}
                </Typography>
                <Typography color="text.secondary">/mes</Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <List sx={{ flexGrow: 1, mb: 4 }}>
                {plan.features.map((f) => (
                  <ListItem key={f} disableGutters sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          {f}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                fullWidth
                variant={plan.pro ? 'contained' : 'outlined'}
                component={Link}
                to="/login"
                sx={{
                  py: 1.5,
                  bgcolor: plan.pro ? '#10b981' : 'transparent',
                  borderColor: '#10b981',
                  color: plan.pro ? 'white' : '#10b981',
                  '&:hover': {
                    bgcolor: plan.pro
                      ? '#059669'
                      : 'rgba(16,185,129,0.1)'
                  }
                }}
              >
                {plan.btn}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pricing;