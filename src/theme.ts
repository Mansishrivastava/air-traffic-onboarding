import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#FF7E7E',
    },
    background: {
      default: '#F8F8F8',
    },
  },
  typography: {
    fontFamily: '"Manrope", sans-serif',
    h1: { 
      fontWeight: 800,
      fontSize: '3.5rem',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: { 
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: { 
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          padding: '0.75rem 2rem',
          fontSize: '1rem',
        },
      },
    },
  },
});

export default theme; 