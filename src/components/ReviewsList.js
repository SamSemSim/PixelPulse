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
  Rating,
} from '@mui/material';
import { getGames } from '../services/api';
import GameDetail from './GameDetail';

function ReviewsList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getGames({
          ordering: '-metacritic',
          metacritic: '1,100',
          page_size: 15,
        });
        // Filter out games with no metacritic score
        const filteredGames = data.results.filter(game => 
          game.metacritic && 
          game.background_image
        );
        setGames(filteredGames);
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleGameClick = (gameId) => {
    setSelectedGame(gameId);
  };

  const handleCloseDetail = () => {
    setSelectedGame(null);
  };

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

  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Latest Reviews
      </Typography>
      <Grid container spacing={4}>
        {games.map((game) => (
          <Grid item xs={12} key={game.id}>
            <Card 
              sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                backgroundColor: 'transparent',
                boxShadow: 'none',
                cursor: 'pointer',
                '&:hover': {
                  '& .MuiTypography-root.game-title': {
                    color: 'primary.main',
                  }
                }
              }}
              onClick={() => handleGameClick(game.id)}
            >
              <CardMedia
                component="img"
                sx={{ 
                  width: { xs: '100%', md: 280 },
                  height: { xs: 200, md: 280 },
                  borderRadius: 1
                }}
                image={game.background_image}
                alt={game.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, ml: { md: 3 }, mt: { xs: 2, md: 0 } }}>
                <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                    <Chip
                      label={game.genres[0]?.name || 'Game'}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        height: 24
                      }}
                    />
                    {game.metacritic && (
                      <Chip
                        label={`${game.metacritic}/100`}
                        size="small"
                        sx={{
                          backgroundColor: game.metacritic >= 75 ? '#4caf50' : 
                                         game.metacritic >= 50 ? '#ff9800' : '#f44336',
                          color: 'white',
                          height: 24
                        }}
                      />
                    )}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2"
                    className="game-title"
                    sx={{
                      mb: 2,
                      transition: 'color 0.2s',
                      fontWeight: 'bold',
                    }}
                  >
                    {game.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating 
                      value={game.rating} 
                      readOnly 
                      precision={0.5}
                      sx={{ color: 'primary.main' }}
                    />
                    <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                      ({game.ratings_count} ratings)
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Release Date: {new Date(game.released).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Click to see full details and reviews...
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Game Detail Dialog */}
      <GameDetail
        gameId={selectedGame}
        open={!!selectedGame}
        onClose={handleCloseDetail}
      />
    </Box>
  );
}

export default ReviewsList; 