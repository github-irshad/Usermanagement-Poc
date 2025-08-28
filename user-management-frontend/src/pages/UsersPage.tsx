// src/pages/UsersPage.tsx
import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress, TextField, InputAdornment, Snackbar } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MuiAlert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import UserTable from "../components/users/UserTable";
import UserFormDrawer from "../components/users/UserFormDrawer";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { useUsers } from "../hooks/useUsers";
import type { User } from "../types/user";

export default function UsersPage() {
  const { users, loading, add, update, remove } = useUsers();
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<User | null>(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const showToast = (message: string, severity: "success" | "error" = "success") =>
    setToast({ open: true, message, severity });

  const onAddClick = () => { setEditing(null); setOpenForm(true); };

  const handleSave = async (payload: Omit<User, "id">) => {
    if (editing) {
      await update(editing.id, payload);
      showToast("User updated");
    } else {
      await add(payload);
      showToast("User added");
    }
    setOpenForm(false);
    setEditing(null);
  };

  const handleEdit = (u: User) => { setEditing(u); setOpenForm(true); };

  const handleDelete = (u: User) => { setToDelete(u); setConfirmOpen(true); };

  const confirmDelete = async () => {
    if (toDelete) {
      await remove(toDelete.id);
      setConfirmOpen(false);
      setToDelete(null);
      showToast("User deleted");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">User Management</Typography>
      <Box mt={2} sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "flex-end" }}>
        <TextField
          size="small"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{ startAdornment: (
            <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
          )}}
          sx={{ maxWidth: 360 }}
        />
        <Button variant="contained" onClick={onAddClick} startIcon={<AddRoundedIcon />}>Add New User</Button>
      </Box>

      {loading ? <Box mt={3}><CircularProgress /></Box> : (
        (() => {
          const filtered = users.filter((u) => {
            const q = query.trim().toLowerCase();
            if (!q) return true;
            return [u.name, u.email, u.phone, u.department, u.gender, u.role]
              .join(" ")
              .toLowerCase()
              .includes(q);
          });
          return (
            <UserTable
              users={filtered}
              visibleCount={filtered.length}
              totalCount={users.length}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        })()
      )}

      <UserFormDrawer
        open={openForm}
        initial={editing}
        onClose={() => { setOpenForm(false); setEditing(null); }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete User"
        content="Are you sure you want to delete this user?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert elevation={3} variant="filled" severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
