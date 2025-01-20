import React from 'react';
import { Box, Typography } from '@mui/material';
import GameNewsList from './GameNewsList';
import ReviewsList from './ReviewsList';
import PlatformGames from './PlatformGames';
import SearchResults from './SearchResults';

function PageContent({ currentPage, searchQuery }) {
  const renderContent = () => {
    switch (currentPage) {
      case 0: // Home
        return <GameNewsList type="latest" />;
      case 1: // Reviews
        return <ReviewsList />;
      case 2: // News
        return <GameNewsList type="upcoming" />;
      case 3: // Videos
        return <GameNewsList type="popular" />;
      case 4: // PC
        return <PlatformGames platformId={4} />;
      case 5: // PlayStation
        return <PlatformGames platformId={187} />;
      case 6: // Xbox
        return <PlatformGames platformId={1} />;
      case 7: // Nintendo
        return <PlatformGames platformId={7} />;
      case 8: // Search
        return <SearchResults query={searchQuery} />;
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Page not found</Typography>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', pt: 3, pb: 8 }}>
      {renderContent()}
    </Box>
  );
}

export default PageContent; 