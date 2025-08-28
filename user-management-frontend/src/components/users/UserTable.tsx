// src/components/users/UserTable.tsx
import React from "react";
import type { User } from "../../types/user";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Menu, MenuItem, ListItemIcon, ListItemText
} from "@mui/material";
import RoleChip from "../common/RoleChip";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
  visibleCount?: number;
  totalCount?: number;
}

export default function UserTable({ users, onEdit, onDelete, visibleCount, totalCount }: Props) {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [menuForId, setMenuForId] = React.useState<string | null>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setMenuAnchor(event.currentTarget);
    setMenuForId(id);
  };
  const closeMenu = () => { setMenuAnchor(null); setMenuForId(null); };
  if (!users || users.length === 0) {
    return <Box p={3}><Typography>No users found</Typography></Box>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{u.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{u.email}</Typography>
                </Box>
              </TableCell>
              <TableCell><RoleChip role={u.role} /></TableCell>
              <TableCell>{u.department}</TableCell>
              <TableCell>{u.gender}</TableCell>
              <TableCell>{u.dob}</TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={(e) => openMenu(e, u.id)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
        <MenuItem onClick={() => { const item = users.find(x => x.id === menuForId); if (item) onEdit(item); closeMenu(); }}>
          <ListItemIcon><EditOutlinedIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { const item = users.find(x => x.id === menuForId); if (item) onDelete(item); closeMenu(); }}>
          <ListItemIcon><DeleteOutlineIcon color="error" fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      {(visibleCount !== undefined && totalCount !== undefined) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2 }}>
          <PersonOutlineIcon fontSize="small" />
          <Typography variant="body2">Showing {visibleCount} of {totalCount} users.</Typography>
        </Box>
      )}
    </TableContainer>
  );
}
