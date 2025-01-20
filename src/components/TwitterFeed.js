import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function TwitterFeed() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // Replace this with your actual Twitter API endpoint and key
        const response = await axios.get('YOUR_TWITTER_API_ENDPOINT', {
          headers: {
            'Authorization': 'Bearer YOUR_TWITTER_API_KEY'
          },
          params: {
            query: 'from:IGN OR from:GameSpot OR from:Polygon filter:links -is:retweet',
            max_results: 10,
            'tweet.fields': 'created_at,public_metrics'
          }
        });
        setTweets(response.data.data || []);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  return (
    <Paper
      sx={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '300px',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        display: { xs: 'none', xl: 'flex' }, // Only show on extra large screens
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          color: 'primary.main',
          fontWeight: 'bold',
          borderBottom: '2px solid',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
        >
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
        </svg>
        Gaming News
      </Typography>

      <Box
        sx={{
          p: 2,
          overflowY: 'auto',
          flexGrow: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(255,255,255,0.3)',
            },
          },
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          tweets.map((tweet) => (
            <Box
              key={tweet.id}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                {new Date(tweet.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.primary' }}>
                {tweet.text}
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  ❤️ {tweet.public_metrics.like_count}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  🔄 {tweet.public_metrics.retweet_count}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Paper>
  );
}

export default TwitterFeed; 