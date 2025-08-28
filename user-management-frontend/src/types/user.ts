// src/types/user.ts
export type Gender = "Male" | "Female";
export type Department = "HR" | "IT" | "Sales" | "Marketing" | "Finance";

export interface User {
  id: string;            // GUID-like string
  name: string;
  email: string;
  gender: Gender;
  dob: string;           // ISO date string YYYY-MM-DD
  phone: string;
  department: Department;
}
