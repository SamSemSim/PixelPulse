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
import { useParams } from 'react-router-dom';
import { getGames } from '../services/api';
import GameDetail from './GameDetail';

function PlatformGames() {
  const { platform } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await getGames({
          platforms: platform,
          ordering: '-rating',
          page_size: 20
        });
        // Filter out games with no ratings
        const filteredGames = data.results.filter(game => 
          game.rating > 0 && 
          game.ratings_count > 0 &&
          game.background_image
        );
        setGames(filteredGames);
      } catch (err) {
        setError('Failed to fetch games');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [platform]);

  const handleGameClick = (gameId) => {
    setSelectedGame(gameId);
  };

  const handleCloseDetail = () => {
    setSelectedGame(null);
  };

  const getPlatformName = () => {
    const platformNames = {
      '1': 'Xbox One',
      '4': 'PC',
      '18': 'PlayStation 4',
      '7': 'Nintendo Switch',
      '3': 'iOS',
      '21': 'Android',
      '186': 'Xbox Series X/S',
      '187': 'PlayStation 5'
    };
    return platformNames[platform] || 'Games';
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
        Top {getPlatformName()} Games
      </Typography>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
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
                  height: 200,
                  borderRadius: 1
                }}
                image={game.background_image}
                alt={game.name}
              />
              <CardContent sx={{ p: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
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
                  variant="h6" 
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
                    ({game.ratings_count})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Release Date: {new Date(game.released).toLocaleDateString()}
                </Typography>
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

export default PlatformGames; 