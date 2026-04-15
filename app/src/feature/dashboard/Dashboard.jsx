import React, { useState, useMemo, useEffect } from 'react';
import {
  Container, Grid, Paper, Typography, TextField, Button,
  Box, MenuItem, Stack, Avatar, IconButton, Chip, Fade, InputAdornment
} from '@mui/material';

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  TrendingUp as UpIcon,
  TrendingDown as DownIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [movimientos, setMovimientos] = useState(() => {
    return JSON.parse(localStorage.getItem('finzen_data')) || [];
  });

  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    categoria: 'comida',
    tipo: 'gasto',
    fecha: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    localStorage.setItem('finzen_data', JSON.stringify(movimientos));
  }, [movimientos]);

  const stats = useMemo(() => {
    return movimientos.reduce((acc, curr) => {
      const valor = Number(curr.monto) || 0;

      if (curr.tipo === 'ingreso') acc.ingresos += valor;
      else acc.gastos += valor;

      acc.balance = acc.ingresos - acc.gastos;
      return acc;
    }, { ingresos: 0, gastos: 0, balance: 0 });
  }, [movimientos]);

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!form.monto || !form.descripcion) return;

    const nuevo = {
      id: Date.now(),
      ...form,
      monto: Number(form.monto)
    };

    setMovimientos([nuevo, ...movimientos]);
    setForm({ ...form, descripcion: '', monto: '' });
  };

  const eliminar = (id) => {
    setMovimientos(movimientos.filter(m => m.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      {/* HEADER FINZEN */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={900}
          sx={{
            background: 'linear-gradient(90deg,#6366f1,#22c55e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          FinZen
        </Typography>

        <Typography sx={{ color: '#64748b', mt: 1 }}>
          Controla tu dinero con inteligencia y calma financiera
        </Typography>
      </Box>

      {/* RESUMEN */}
      <Grid container spacing={3} sx={{ mb: 5 }}>

        <Grid xs={12} md={7}>
          <Paper
            sx={{
              p: 5,
              borderRadius: 6,
              background: 'linear-gradient(135deg,#0f172a,#1e293b)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <WalletIcon sx={{ position: 'absolute', right: -30, top: -30, fontSize: 200, opacity: 0.05 }} />

            <Typography sx={{ letterSpacing: 2, opacity: 0.7 }}>
              BALANCE FINZEN
            </Typography>

            <Typography variant="h2" fontWeight={900}>
              ${stats.balance.toLocaleString()}
            </Typography>

            <Chip
              label={stats.balance >= 0 ? 'Finanzas en equilibrio' : 'Atención al gasto'}
              sx={{
                mt: 2,
                bgcolor: stats.balance >= 0 ? '#10b981' : '#ef4444',
                color: 'white',
                fontWeight: 700
              }}
            />
          </Paper>
        </Grid>

        <Grid xs={12} md={5}>
          <Stack spacing={2}>

            <Paper sx={miniCard('#16a34a')}>
              <Avatar sx={{ bgcolor: '#dcfce7', color: '#16a34a' }}>
                <UpIcon />
              </Avatar>
              <Typography fontWeight={700}>Ingresos</Typography>
              <Typography fontWeight={900} color="#16a34a">
                +${stats.ingresos.toLocaleString()}
              </Typography>
            </Paper>

            <Paper sx={miniCard('#dc2626')}>
              <Avatar sx={{ bgcolor: '#fee2e2', color: '#dc2626' }}>
                <DownIcon />
              </Avatar>
              <Typography fontWeight={700}>Gastos</Typography>
              <Typography fontWeight={900} color="#dc2626">
                -${stats.gastos.toLocaleString()}
              </Typography>
            </Paper>

          </Stack>
        </Grid>
      </Grid>

      {/* FORM + LISTA */}
      <Grid container spacing={4}>

        <Grid xs={12} md={5}>
          <Paper sx={{ p: 4, borderRadius: 4, bgcolor: '#f8fafc' }}>
            <Typography fontWeight={900} mb={3}>
              Nuevo movimiento financiero
            </Typography>

            <form onSubmit={handleGuardar}>
              <Stack spacing={2}>

                <TextField
                  select
                  label="Tipo"
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                >
                  <MenuItem value="ingreso">Ingreso</MenuItem>
                  <MenuItem value="gasto">Gasto</MenuItem>
                </TextField>

                <TextField
                  label="Descripción"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                />

                <TextField
                  label="Monto"
                  type="number"
                  value={form.monto}
                  onChange={(e) => setForm({ ...form, monto: e.target.value })}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 800,
                    background: form.tipo === 'gasto'
                      ? '#0f172a'
                      : '#16a34a'
                  }}
                  startIcon={<AddIcon />}
                >
                  Guardar en FinZen
                </Button>

              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid xs={12} md={7}>
          <Typography fontWeight={900} mb={2}>
            Movimientos recientes
          </Typography>

          <Stack spacing={2}>
            {movimientos.map((mov) => (
              <Fade in key={mov.id}>
                <Paper sx={itemCard}>
                  <Avatar sx={{
                    bgcolor: mov.tipo === 'ingreso' ? '#dcfce7' : '#fee2e2'
                  }}>
                    {mov.tipo === 'ingreso'
                      ? <UpIcon sx={{ color: '#16a34a' }} />
                      : <DownIcon sx={{ color: '#dc2626' }} />
                    }
                  </Avatar>

                  <Box sx={{ flexGrow: 1, ml: 2 }}>
                    <Typography fontWeight={800}>
                      {mov.descripcion}
                    </Typography>
                  </Box>

                  <Typography
                    fontWeight={900}
                    color={mov.tipo === 'ingreso' ? '#16a34a' : '#dc2626'}
                    sx={{ mr: 2 }}
                  >
                    {mov.tipo === 'ingreso' ? '+' : '-'}
                    ${mov.monto.toLocaleString()}
                  </Typography>

                  <IconButton onClick={() => eliminar(mov.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Fade>
            ))}
          </Stack>
        </Grid>

      </Grid>
    </Container>
  );
};

// estilos
const miniCard = (color) => ({
  p: 3,
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderLeft: `5px solid ${color}`
});

const itemCard = {
  p: 2,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center'
};

export default Dashboard;