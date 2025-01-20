import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import theme from './theme';
import Navbar from './components/Navbar';
import GameNewsList from './components/GameNewsList';
import ReviewsList from './components/ReviewsList';
import PlatformGames from './components/PlatformGames';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={(theme) => ({
            minHeight: '100vh',
            backgroundColor: alpha(theme.palette.background.default, 0.98),
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          })}
        >
          <Navbar />
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<GameNewsList type="popular" />} />
              <Route path="/news" element={<GameNewsList type="latest" />} />
              <Route path="/reviews" element={<ReviewsList />} />
              <Route path="/platform/:platform" element={<PlatformGames />} />
            </Routes>
          </Container>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
