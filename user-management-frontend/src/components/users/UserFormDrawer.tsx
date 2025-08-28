// src/components/users/UserFormDrawer.tsx
import React, { useEffect } from "react";
import {
  Drawer, Box, Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, MenuItem, Stack, Typography, IconButton, Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { User, Gender, Department, Role } from "../../types/user";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns/format";

interface FormValues {
  name: string;
  email: string;
  gender: Gender;
  dob: Date | null;
  phone: string;
  department: Department;
  role: Role;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  gender: yup.mixed().oneOf(["Male", "Female"]).required(),
  dob: yup.date().nullable().required("Date of birth is required").max(new Date(), "DOB must be in past"),
  phone: yup.string().required("Phone is required").min(7, "Too short"),
  department: yup.string().required("Department is required"),
  role: yup.mixed().oneOf(["Admin","Editor","Viewer"]).required(),
});

interface Props {
  open: boolean;
  initial?: User | null;
  onClose: () => void;
  onSave: (payload: Omit<User, "id">) => Promise<void>;
}

const departments: Department[] = ["HR","IT","Sales","Marketing","Finance"];
const roles: Role[] = ["Admin","Editor","Viewer"];

export default function UserFormDrawer({ open, initial, onClose, onSave }: Props) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: yupResolver(schema as yup.ObjectSchema<FormValues>),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      dob: null,
      phone: "",
      department: "HR",
      role: "Viewer",
    },
  });

  useEffect(() => {
    if (initial) {
      reset({
        name: initial.name,
        email: initial.email,
        gender: initial.gender,
        dob: initial.dob ? new Date(initial.dob) : null,
        phone: initial.phone,
        department: initial.department,
        role: initial.role,
      });
    } else {
      reset({
        name: "",
        email: "",
        gender: "Male",
        dob: null,
        phone: "",
        department: "HR",
        role: "Viewer",
      });
    }
  }, [initial, reset]);

  const submit = async (data: FormValues) => {
    // Build payload
    const payload: Omit<User, "id"> = {
      name: data.name.trim(),
      email: data.email.trim(),
      gender: data.gender,
      dob: data.dob ? format(data.dob, "yyyy-MM-dd") : "",
      phone: data.phone.trim(),
      department: data.department,
      role: data.role,
    };
    await onSave(payload);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 440 } }}>
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{initial ? "Edit User" : "Add User"}</Typography>
            <Typography variant="body2" color="text.secondary">{initial ? "Update the user's details below." : "Enter the details for the new user."}</Typography>
          </Box>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box component="form" onSubmit={handleSubmit(submit)} sx={{ p: 3, flex: 1, overflow: "auto" }}>
          <Stack spacing={2.5}>
            <Controller name="name" control={control} render={({ field }) => (
              <TextField margin="normal" label="Full Name" {...field} error={!!errors.name} helperText={errors.name?.message} />
            )} />

            <Controller name="email" control={control} render={({ field }) => (
              <TextField margin="normal" label="Email Address" {...field} error={!!errors.email} helperText={errors.email?.message} />
            )} />

            {/* Gender/Role moved to bottom as dropdowns */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller name="dob" control={control} render={({ field }) => (
                <DatePicker
                  label="Date of Birth"
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                  slotProps={{
                    textField: {
                      margin: "normal",
                      error: !!errors.dob,
                      helperText: errors.dob?.message,
                    },
                  }}
                />
              )} />
            </LocalizationProvider>

            <Controller name="phone" control={control} render={({ field }) => (
              <TextField margin="normal" label="Phone Number" {...field} error={!!errors.phone} helperText={errors.phone?.message} />
            )} />

            <Controller name="department" control={control} render={({ field }) => (
              <TextField margin="normal" select label="Department" {...field} error={!!errors.department} helperText={errors.department?.message}>
                {departments.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            )} />

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box>
                <Controller name="gender" control={control} render={({ field }) => (
                <TextField margin="normal" select label="Gender" {...field} error={!!errors.gender} helperText={errors.gender?.toString() as any}>
                  {["Male","Female"].map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </TextField>
                )} />
              </Box>
              <Box>
                <Controller name="role" control={control} render={({ field }) => (
                <TextField margin="normal" select label="Role" {...field} error={!!errors.role} helperText={errors.role?.message}>
                  {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </TextField>
                )} />
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
              <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}
