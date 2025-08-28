import React from "react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme/theme";
import UsersPage from "./pages/UsersPage";
import TopBar from "./components/common/TopBar";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <UsersPage />
      </Container>
    </ThemeProvider>
  );
}
