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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getGames, getUpcomingGames } from '../services/api';
import GameDetail from './GameDetail';

function GameNewsList({ type = "latest" }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        let data;
        
        switch (type) {
          case 'upcoming':
            data = await getUpcomingGames();
            break;
          case 'popular':
            data = await getGames({ 
              ordering: '-rating', 
              page_size: 40,
              metacritic: '80,100'
            });
            break;
          default: // latest
            const today = new Date();
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(today.getMonth() - 3);
            
            data = await getGames({ 
              ordering: '-released',
              page_size: 40,
              dates: `${threeMonthsAgo.toISOString().split('T')[0]},${today.toISOString().split('T')[0]}`
            });
        }
        
        const filteredGames = data.results.filter(game => {
          if (type === 'latest') {
            return game.background_image;
          } else {
            return game.rating > 0 && 
                   game.ratings_count > 0 && 
                   game.background_image;
          }
        });

        setGames(filteredGames.slice(0, 20));
      } catch (err) {
        setError('Failed to fetch games');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [type]);

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

  if (games.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography>No games found</Typography>
      </Box>
    );
  }

  // Featured game (first item)
  const featuredGame = games[0];
  const remainingGames = games.slice(1);

  return (
    <Box>
      {/* Featured Game */}
      {featuredGame && (
        <Card 
          sx={{ 
            mb: 4,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
              '& .MuiTypography-root': {
                color: 'primary.main',
              }
            }
          }}
          onClick={() => handleGameClick(featuredGame.id)}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="500"
              image={featuredGame.background_image}
              alt={featuredGame.name}
              sx={{
                borderRadius: 1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)',
                p: 3,
              }}
            >
              <Chip
                label={featuredGame.genres[0]?.name || 'Game'}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontWeight: 'bold',
                  mb: 2
                }}
              />
              <Typography variant="h4" component="h1" sx={{ color: 'white', mb: 1, fontWeight: 'bold' }}>
                {featuredGame.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  Rating: {featuredGame.rating.toFixed(1)}/5 ({featuredGame.ratings_count} reviews)
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  {new Date(featuredGame.released).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      )}

      {/* Recent Games Grid */}
      <Grid container spacing={3}>
        {remainingGames.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card 
              sx={{ 
                height: '100%',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                cursor: 'pointer',
                '&:hover': {
                  '& .MuiTypography-root': {
                    color: 'primary.main',
                  }
                }
              }}
              onClick={() => handleGameClick(game.id)}
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
                      backgroundColor: game.metacritic >= 75 ? '#4caf50' : 
                                     game.metacritic >= 50 ? '#ff9800' : '#f44336',
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
                  }}
                >
                  {game.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Rating: {game.rating.toFixed(1)}/5 ({game.ratings_count})
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

      {/* Game Detail Dialog */}
      <GameDetail
        gameId={selectedGame}
        open={!!selectedGame}
        onClose={handleCloseDetail}
      />
    </Box>
  );
}

export default GameNewsList; 