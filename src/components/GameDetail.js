import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  Grid,
  Rating,
  CircularProgress,
  ImageList,
  ImageListItem,
  Divider,
  Avatar,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getGameDetails, getGameScreenshots, getGameReviews } from '../services/api';

function GameDetail({ gameId, open, onClose }) {
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllScreenshots, setShowAllScreenshots] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      if (!gameId) return;
      
      try {
        setLoading(true);
        const [gameData, screenshotsData, reviewsData] = await Promise.all([
          getGameDetails(gameId),
          getGameScreenshots(gameId),
          getGameReviews(gameId)
        ]);
        setGame(gameData);
        setScreenshots(screenshotsData.results);
        setReviews(reviewsData.results || []);
      } catch (err) {
        setError('Failed to fetch game details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  if (!open) return null;

  const displayedScreenshots = showAllScreenshots ? screenshots : screenshots.slice(0, 4);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : game && (
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={game.background_image}
                alt={game.name}
                sx={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
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
                <Typography variant="h4" component="h1" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
                  {game.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {game.genres?.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 3 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    About
                  </Typography>
                  <Typography paragraph>
                    {game.description_raw}
                  </Typography>

                  {screenshots.length > 0 && (
                    <>
                      <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 'bold' }}>
                        Screenshots
                      </Typography>
                      <ImageList cols={2} gap={16}>
                        {displayedScreenshots.map((screenshot) => (
                          <ImageListItem key={screenshot.id}>
                            <img
                              src={screenshot.image}
                              alt={`Screenshot ${screenshot.id}`}
                              loading="lazy"
                              style={{ borderRadius: '8px' }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                      {screenshots.length > 4 && (
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                          <Button 
                            onClick={() => setShowAllScreenshots(!showAllScreenshots)}
                            variant="outlined"
                          >
                            {showAllScreenshots ? 'Show Less' : 'Show More Screenshots'}
                          </Button>
                        </Box>
                      )}
                    </>
                  )}

                  {reviews.length > 0 && (
                    <>
                      <Typography variant="h6" sx={{ mb: 2, mt: 4, fontWeight: 'bold' }}>
                        Reviews
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {reviews.map((review) => (
                          <Box key={review.id}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                              <Avatar src={review.user?.avatar} alt={review.user?.username}>
                                {review.user?.username?.[0]?.toUpperCase()}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                  {review.user?.username}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Rating value={review.rating} readOnly size="small" />
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(review.created).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Typography paragraph>
                              {review.text}
                            </Typography>
                            {review.likes > 0 && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ThumbUpIcon fontSize="small" color="primary" />
                                <Typography variant="caption">
                                  {review.likes} {review.likes === 1 ? 'person' : 'people'} found this helpful
                                </Typography>
                              </Box>
                            )}
                            <Divider sx={{ mt: 2 }} />
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Game Info
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Release Date
                      </Typography>
                      <Typography>
                        {new Date(game.released).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Rating
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={game.rating} readOnly precision={0.5} />
                        <Typography>({game.ratings_count} reviews)</Typography>
                      </Box>
                    </Box>

                    {game.metacritic && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Metacritic Score
                        </Typography>
                        <Chip
                          label={game.metacritic}
                          sx={{
                            bgcolor: game.metacritic >= 75 ? '#4caf50' : 
                                    game.metacritic >= 50 ? '#ff9800' : '#f44336',
                            color: 'white',
                          }}
                        />
                      </Box>
                    )}

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Platforms
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        {game.platforms?.map((platform) => (
                          <Chip
                            key={platform.platform.id}
                            label={platform.platform.name}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    {game.developers?.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Developer
                        </Typography>
                        <Typography>
                          {game.developers.map(dev => dev.name).join(', ')}
                        </Typography>
                      </Box>
                    )}

                    {game.publishers?.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Publisher
                        </Typography>
                        <Typography>
                          {game.publishers.map(pub => pub.name).join(', ')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        )}
      </Box>
    </Dialog>
  );
}

export default GameDetail; 