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
    const saved = localStorage.getItem('ahorra_facil_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    categoria: 'comida',
    tipo: 'gasto',
    fecha: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    localStorage.setItem('ahorra_facil_data', JSON.stringify(movimientos));
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
      monto: parseFloat(form.monto)
    };

    setMovimientos([nuevo, ...movimientos]);
    setForm({ ...form, descripcion: '', monto: '' });
  };

  const eliminar = (id) => {
    if(window.confirm('¿Eliminar este registro?')) {
      setMovimientos(movimientos.filter(m => m.id !== id));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      
      {/* GRID PADRE: Mantiene 'container' */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        
        {/* GRID HIJO: Eliminamos la palabra 'item' para evitar el error de booleano */}
        <Grid xs={12} md={7}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 5, borderRadius: 6, 
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
              color: 'white', position: 'relative', overflow: 'hidden',
              minHeight: '200px', display: 'flex', flexDirection: 'column', 
              justifyContent: 'center'
            }}
          >
            <WalletIcon sx={{ position: 'absolute', right: -20, top: -20, fontSize: 180, opacity: 0.05 }} />
            <Typography variant="overline" sx={{ letterSpacing: 3, opacity: 0.7, fontWeight: 700 }}>
              Balance Neto Actual
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, my: 1, letterSpacing: -2 }}>
              ${stats.balance.toLocaleString()}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Chip 
                label={stats.balance >= 0 ? "Estado Saludable" : "Déficit Detectado"} 
                size="small" 
                sx={{ bgcolor: stats.balance >= 0 ? '#10b981' : '#ef4444', color: 'white', fontWeight: 800 }} 
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid xs={12} md={5}>
          <Stack spacing={2} sx={{ height: '100%', justifyContent: 'center' }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#d1fae5', color: '#10b981' }}><UpIcon /></Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Ingresos</Typography>
              </Stack>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#10b981' }}>+${stats.ingresos.toLocaleString()}</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 5, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#fee2e2', color: '#ef4444' }}><DownIcon /></Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Gastos</Typography>
              </Stack>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#ef4444' }}>-${stats.gastos.toLocaleString()}</Typography>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Registrar Movimiento</Typography>
            <form onSubmit={handleGuardar}>
              <Stack spacing={3}>
                <TextField 
                  select fullWidth label="Tipo" 
                  value={form.tipo} onChange={(e) => setForm({...form, tipo: e.target.value})}
                >
                  <MenuItem value="gasto">🔴 Gasto</MenuItem>
                  <MenuItem value="ingreso">🟢 Ingreso</MenuItem>
                </TextField>

                <TextField 
                  fullWidth label="Descripción" 
                  value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})}
                />

                <Stack direction="row" spacing={2}>
                  <TextField 
                    fullWidth label="Monto" type="number"
                    value={form.monto} onChange={(e) => setForm({...form, monto: e.target.value})}
                    // SOLUCIÓN: slotProps evita el error de InputProps en consola
                    slotProps={{
                      input: {
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }
                    }}
                  />
                  <TextField 
                    fullWidth type="date" label="Fecha" 
                    value={form.fecha} onChange={(e) => setForm({...form, fecha: e.target.value})}
                    // SOLUCIÓN: slotProps evita el error de InputLabelProps en consola
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                </Stack>

                <Button 
                  fullWidth variant="contained" size="large" type="submit"
                  sx={{ bgcolor: form.tipo === 'gasto' ? '#0f172a' : '#10b981', py: 2, borderRadius: 4, fontWeight: 800 }}
                  startIcon={<AddIcon />}
                >
                  Confirmar {form.tipo}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid>

        <Grid xs={12} md={7}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Historial Reciente</Typography>
          <Stack spacing={2}>
            {movimientos.map((mov) => (
              <Fade in key={mov.id}>
                <Paper elevation={0} sx={{ p: 2.5, borderRadius: 5, border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: mov.tipo === 'ingreso' ? '#d1fae5' : '#fee2e2', mr: 2 }}>
                    {mov.tipo === 'ingreso' ? <UpIcon sx={{ color: '#10b981' }} /> : <DownIcon sx={{ color: '#ef4444' }} />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{mov.descripcion}</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: mov.tipo === 'ingreso' ? '#10b981' : '#ef4444', mr: 2 }}>
                    {mov.tipo === 'ingreso' ? '+' : '-'}${mov.monto.toLocaleString()}
                  </Typography>
                  <IconButton onClick={() => eliminar(mov.id)} color="error" size="small">
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

export default Dashboard;