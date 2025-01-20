import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Chip,
  CircularProgress,
} from '@mui/material';
import { searchGames } from '../services/api';

function SearchResults({ query }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setGames([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await searchGames(query);
        setGames(data.results);
      } catch (err) {
        setError('Failed to fetch search results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!query) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>Enter a search term to find games</Typography>
      </Box>
    );
  }

  if (games.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>No results found for "{query}"</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card 
              sx={{ 
                height: '100%',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                '&:hover': {
                  '& .MuiTypography-root': {
                    color: 'primary.main',
                  }
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={game.background_image}
                  alt={game.name}
                  sx={{
                    borderRadius: 1,
                    mb: 2
                  }}
                />
                {game.metacritic && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                  >
                    {game.metacritic}
                  </Box>
                )}
              </Box>
              <CardContent sx={{ p: 0 }}>
                <Chip
                  label={game.genres[0]?.name || 'Game'}
                  size="small"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    mb: 1,
                    height: 24
                  }}
                />
                <Typography 
                  variant="h6" 
                  component="h2"
                  sx={{
                    mb: 1,
                    transition: 'color 0.2s',
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  {game.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Rating: {game.rating}/5
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(game.released).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SearchResults; 