// src/components/users/UserFormDrawer.tsx
import React, { useEffect } from "react";
import {
  Drawer, Box, Button, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, MenuItem, Stack
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, Gender, Department } from "../../types/user";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import format from "date-fns/format";

interface FormValues {
  name: string;
  email: string;
  gender: Gender;
  dob: Date | null;
  phone: string;
  department: Department;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  gender: yup.mixed().oneOf(["Male", "Female"]).required(),
  dob: yup.date().nullable().required("Date of birth is required").max(new Date(), "DOB must be in past"),
  phone: yup.string().required("Phone is required").min(7, "Too short"),
  department: yup.string().required("Department is required"),
});

interface Props {
  open: boolean;
  initial?: User | null;
  onClose: () => void;
  onSave: (payload: Omit<User, "id">) => Promise<void>;
}

const departments: Department[] = ["Engineering","Sales","HR","Finance","Marketing","Operations"];

export default function UserFormDrawer({ open, initial, onClose, onSave }: Props) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      dob: null,
      phone: "",
      department: "Engineering",
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
      });
    } else {
      reset({
        name: "",
        email: "",
        gender: "Male",
        dob: null,
        phone: "",
        department: "Engineering",
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
    };
    await onSave(payload);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 420, p: 3 }}>
        <form onSubmit={handleSubmit(submit)}>
          <Stack spacing={2}>
            <Controller name="name" control={control} render={({ field }) => (
              <TextField label="Name" {...field} error={!!errors.name} helperText={errors.name?.message} />
            )} />

            <Controller name="email" control={control} render={({ field }) => (
              <TextField label="Email" {...field} error={!!errors.email} helperText={errors.email?.message} />
            )} />

            <div>
              <FormLabel>Gender</FormLabel>
              <Controller name="gender" control={control} render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              )} />
            </div>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller name="dob" control={control} render={({ field }) => (
                <DatePicker
                  label="Date of Birth"
                  value={field.value}
                  onChange={(v) => field.onChange(v)}
                  renderInput={(params) =>
                    <TextField {...params} error={!!errors.dob} helperText={errors.dob?.message} />
                  }
                />
              )} />
            </LocalizationProvider>

            <Controller name="phone" control={control} render={({ field }) => (
              <TextField label="Phone" {...field} error={!!errors.phone} helperText={errors.phone?.message} />
            )} />

            <Controller name="department" control={control} render={({ field }) => (
              <TextField select label="Department" {...field} error={!!errors.department} helperText={errors.department?.message}>
                {departments.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            )} />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
              <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}
