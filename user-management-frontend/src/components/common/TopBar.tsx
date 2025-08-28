// src/components/common/TopBar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

export default function TopBar() {
  return (
    <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleOutlineIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>UserVerse</Typography>
        </Box>
        <IconButton color="inherit" aria-label="toggle theme">
          <Brightness4OutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}


