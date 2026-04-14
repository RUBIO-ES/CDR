import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Avatar, Paper, 
  CircularProgress, TextField, InputAdornment 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const CharactersExplorer = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await axios.get('https://rickandmortyapi.com/api/character/?page=1');
        setCharacters(res.data.results);
      } catch (error) { 
        console.error("Error al obtener personajes:", error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617, #0f172a)',
      pt: 10, 
      pb: 10 
    }}>
      <Container maxWidth="xl">
        
        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(90deg,#6366f1,#22c55e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Explorador de Personajes
          </Typography>

          <Typography sx={{ color: '#94a3b8', mb: 4 }}>
            Visualiza y filtra personajes desde una API externa en tiempo real
          </Typography>
          
          <Paper 
            elevation={0} 
            sx={{ 
              p: 1,
              display: 'flex',
              maxWidth: 500,
              mx: 'auto',
              borderRadius: 6,
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <TextField 
              fullWidth 
              variant="standard" 
              placeholder="Buscar personaje..." 
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ ml: 2, mr: 1, color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }
              }}
              sx={{ px: 1, input: { color: '#e2e8f0' } }}
            />
          </Paper>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress sx={{ color: '#22c55e' }} />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            justifyContent: 'center' 
          }}>
            {filteredCharacters.map((char) => (
              <Paper 
                key={char.id} 
                sx={{ 
                  width: { xs: '100%', sm: '45%', md: 'calc(20% - 20px)' },
                  height: 380,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  borderRadius: 6,
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: '0.4s',
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(34,197,94,0.2)',
                    border: '1px solid #22c55e'
                  }
                }}
              >
                
                <Avatar 
                  src={char.image} 
                  sx={{ 
                    width: 110,
                    height: 110,
                    mb: 3,
                    border: '3px solid #22c55e'
                  }} 
                />

                <Box sx={{ 
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <Typography sx={{ 
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    color: '#f1f5f9'
                  }}>
                    {char.name}
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ 
                    px: 3, 
                    py: 0.5,
                    borderRadius: 3,
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    background: char.status === 'Alive'
                      ? 'rgba(34,197,94,0.2)'
                      : char.status === 'Dead'
                      ? 'rgba(239,68,68,0.2)'
                      : 'rgba(148,163,184,0.2)',
                    color: char.status === 'Alive'
                      ? '#22c55e'
                      : char.status === 'Dead'
                      ? '#ef4444'
                      : '#94a3b8'
                  }}>
                    {char.status}
                  </Box>
                </Box>

              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CharactersExplorer;