// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
          borderRadius: 12,
          backgroundColor: '#fff',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        startIcon: undefined,
      },
      styleOverrides: {
        containedPrimary: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
