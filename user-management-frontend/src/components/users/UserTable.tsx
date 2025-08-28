// src/components/users/UserTable.tsx
import React from "react";
import type { User } from "../../types/user";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Menu, MenuItem, ListItemIcon, ListItemText, Avatar
} from "@mui/material";
import RoleChip from "../common/RoleChip";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { format, parseISO } from "date-fns";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
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
  
  const formatPhone = (raw: string): string => {
    const digits = (raw || "").replace(/\D/g, "");
    if (digits.length === 10) {
      const a = digits.slice(0, 3);
      const b = digits.slice(3, 6);
      const c = digits.slice(6);
      return `(${a}) ${b}-${c}`;
    }
    return raw;
  };
  const hasUsers = users && users.length > 0;

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
          {hasUsers ? users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar alt={u.name} src={`https://i.pravatar.cc/40?u=${encodeURIComponent(u.email)}`} />
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{u.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{u.email}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell><RoleChip role={u.role} /></TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ApartmentOutlinedIcon color="primary" fontSize="small" />
                  <Typography variant="body2">{u.department}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <WcOutlinedIcon color="primary" fontSize="small" />
                  <Typography variant="body2">{u.gender}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarMonthOutlinedIcon color="primary" fontSize="small" />
                  <Typography variant="body2">{format(parseISO(u.dob), "do MMM, yyyy")}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 600 }}>{formatPhone(u.phone)}</Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={(e) => openMenu(e, u.id)}>
                  <MoreHorizIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
                  No users found.
                </Box>
              </TableCell>
            </TableRow>
          )}
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
