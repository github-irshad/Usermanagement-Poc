// src/components/users/UserTable.tsx
import React from "react";
import type { User } from "../../types/user";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box
} from "@mui/material";
import RoleChip from "../common/RoleChip";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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
  if (!users || users.length === 0) {
    return <Box p={3}><Typography>No users found</Typography></Box>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Department</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell><RoleChip role={u.role} /></TableCell>
              <TableCell>{u.gender}</TableCell>
              <TableCell>{u.dob}</TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell>{u.department}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => onEdit(u)}><EditIcon /></IconButton>
                <IconButton size="small" onClick={() => onDelete(u)}><DeleteIcon color="error" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(visibleCount !== undefined && totalCount !== undefined) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 2 }}>
          <PersonOutlineIcon fontSize="small" />
          <Typography variant="body2">Showing {visibleCount} of {totalCount} users.</Typography>
        </Box>
      )}
    </TableContainer>
  );
}
