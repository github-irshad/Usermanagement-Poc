// src/components/common/RoleChip.tsx
import React from "react";
import { Chip } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Role } from "../../types/user";

interface Props {
  role: Role;
}

export default function RoleChip({ role }: Props) {
  const color: "default" | "primary" | "success" | "error" | "warning" | "info" =
    role === "Admin" ? "error" : role === "Editor" ? "primary" : "default";

  const icon = role === "Admin" ? <SecurityIcon fontSize="small" />
    : role === "Editor" ? <EditIcon fontSize="small" />
    : <VisibilityIcon fontSize="small" />;

  return (
    <Chip size="small" color={color} icon={icon} label={role} sx={{ fontWeight: 600 }} />
  );
}


