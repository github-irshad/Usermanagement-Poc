// src/pages/UsersPage.tsx
import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
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

  const onAddClick = () => { setEditing(null); setOpenForm(true); };

  const handleSave = async (payload: Omit<User, "id">) => {
    if (editing) {
      await update(editing.id, payload);
    } else {
      await add(payload);
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
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">User Management</Typography>
      <Box mt={2}>
        <Button variant="contained" onClick={onAddClick}>Add New User</Button>
      </Box>

      {loading ? <Box mt={3}><CircularProgress /></Box> : (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
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
    </Box>
  );
}
