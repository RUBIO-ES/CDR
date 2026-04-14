import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Grid, Card, CardMedia, CardContent, 
  Button, Box, Chip, Skeleton, Stack 
} from '@mui/material';

export const ApiCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
        setCharacters(res.data.results);
      } catch (err) {
        console.error("Error al traer datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      
      {/* HEADER NUEVO */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 6 }} 
        spacing={2}
      >
        <Box>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900,
              background: 'linear-gradient(90deg,#6366f1,#10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Explorador Multiverso
          </Typography>

          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Integración dinámica de APIs externas dentro de FinZen.
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          size="large"
          onClick={() => setPage(page + 1)}
          sx={{ 
            borderRadius: 3, 
            px: 4, 
            fontWeight: 800,
            textTransform: 'none',
            background: 'linear-gradient(90deg,#6366f1,#10b981)',
            '&:hover': { opacity: 0.9 }
          }}
        >
          Página {page + 1}
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {loading ? (
          [...Array(8)].map((_, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton 
                variant="rectangular" 
                height={260} 
                sx={{ borderRadius: 5 }} 
              />
            </Grid>
          ))
        ) : (
          characters.map((char) => (
            <Grid item xs={12} sm={6} md={3} key={char.id}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: 6, 
                  overflow: 'hidden',
                  border: '1px solid #f1f5f9',
                  transition: '0.35s',
                  background: '#ffffff',
                  '&:hover': { 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 30px -10px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={char.image}
                  alt={char.name}
                />

                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 800, 
                      color: '#0f172a',
                      fontSize: '1.05rem',
                      mb: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {char.name}
                  </Typography>

                  <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                  >
                    <Chip 
                      label={char.status} 
                      size="small" 
                      sx={{ 
                        fontWeight: 700,
                        bgcolor:
                          char.status === 'Alive'
                            ? '#dcfce7'
                            : char.status === 'Dead'
                            ? '#fee2e2'
                            : '#e2e8f0',
                        color:
                          char.status === 'Alive'
                            ? '#16a34a'
                            : char.status === 'Dead'
                            ? '#dc2626'
                            : '#475569'
                      }} 
                    />

                    <Typography 
                      variant="caption" 
                      sx={{ color: '#64748b' }}
                    >
                      {char.species}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};