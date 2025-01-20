import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000', // IGN Red
      light: '#ff3333',
      dark: '#cc0000',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
      letterSpacing: 0.5,
    },
    h5: {
      fontWeight: 700,
      letterSpacing: 0.5,
    },
    h4: {
      fontWeight: 800,
      letterSpacing: 0.5,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
          minWidth: 'auto',
          padding: '6px 16px',
          '&.Mui-selected': {
            color: '#ff0000',
          },
        },
      },
    },
  },
});

export default theme; 