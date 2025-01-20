import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tabs,
  Tab,
  InputBase,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const getTabValue = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/news') return 1;
    if (path === '/reviews') return 2;
    if (path.startsWith('/platform/4')) return 3; // PC
    if (path.startsWith('/platform/18')) return 4; // PlayStation 4
    if (path.startsWith('/platform/1')) return 5; // Xbox One
    if (path.startsWith('/platform/7')) return 6; // Nintendo Switch
    return false;
  };

  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/news');
        break;
      case 2:
        navigate('/reviews');
        break;
      case 3:
        navigate('/platform/4'); // PC
        break;
      case 4:
        navigate('/platform/18'); // PlayStation 4
        break;
      case 5:
        navigate('/platform/1'); // Xbox One
        break;
      case 6:
        navigate('/platform/7'); // Nintendo Switch
        break;
      default:
        break;
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SportsEsportsIcon 
            sx={{ 
              fontSize: 36, 
              color: 'primary.main',
              cursor: 'pointer',
              filter: 'drop-shadow(0 0 8px rgba(124, 77, 255, 0.5))',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                filter: 'drop-shadow(0 0 12px rgba(124, 77, 255, 0.8))',
              }
            }} 
            onClick={() => navigate('/')}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontSize: '1.8rem',
              fontWeight: '800',
              background: 'linear-gradient(45deg, #7C4DFF 30%, #448AFF 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                transform: 'scale(1.05)',
                filter: 'brightness(1.2)',
              },
              '& .highlight': {
                color: '#FF4081',
                fontWeight: '900',
              }
            }}
            onClick={() => navigate('/')}
          >
            PIXEL<span className="highlight">PULSE</span>
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            position: 'relative',
            backgroundColor: (theme) => alpha(theme.palette.common.white, 0.07),
            borderRadius: 2,
            marginRight: 2,
            width: 'auto',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
              transform: 'translateY(-1px)',
            },
          }}
        >
          <Box sx={{
            padding: '0 12px',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
          </Box>
          <InputBase
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            sx={{
              color: 'inherit',
              padding: '10px 10px 10px 48px',
              width: '300px',
              '& .MuiInputBase-input': {
                padding: '0',
                fontSize: '0.95rem',
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.5)',
                  opacity: 1,
                }
              }
            }}
          />
        </Box>

        <IconButton 
          color="inherit"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              transform: 'translateY(-1px)',
            }
          }}
        >
          <PersonIcon />
        </IconButton>
      </Toolbar>

      <Box sx={{ width: '100%', bgcolor: 'rgba(0,0,0,0.2)' }}>
        <Tabs
          value={getTabValue()}
          onChange={handleTabChange}
          variant="fullWidth"
          centered
          sx={{
            minHeight: '48px',
            maxWidth: 'lg',
            margin: '0 auto',
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-between',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: '3px',
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              minHeight: '48px',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              transition: 'all 0.2s',
              flex: 1,
              maxWidth: 'none',
              letterSpacing: '0.5px',
              '&:hover': {
                color: 'rgba(255,255,255,0.9)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              }
            }
          }}
        >
          <Tab label="Home" />
          <Tab label="News" />
          <Tab label="Reviews" />
          <Tab label="PC" />
          <Tab label="PlayStation" />
          <Tab label="Xbox" />
          <Tab label="Nintendo" />
        </Tabs>
      </Box>
    </AppBar>
  );
}

export default Navbar; 