// src/api/userApi.ts
import type { User } from "../types/user";
import axiosClient from "./axiosClient";

// Backend entity and DTO shapes
type BackendGender = "Male" | "Female";
type BackendDepartment = "Engineering" | "Sales" | "HR" | "Finance" | "Marketing" | "Operations";

interface BackendUser {
  id: string;
  name: string;
  email: string;
  gender: BackendGender;
  dateOfBirth: string; // ISO
  phone: string;
  department: BackendDepartment;
}

interface UserDto {
  name: string;
  email: string;
  gender: BackendGender;
  dateOfBirth: string; // ISO
  phone: string;
  department: BackendDepartment;
}

const mapFromBackend = (u: BackendUser): User => ({
  id: u.id,
  name: u.name,
  email: u.email,
  gender: u.gender,
  dob: u.dateOfBirth.substring(0, 10),
  phone: u.phone,
  department: u.department,
});

const toDto = (payload: Omit<User, "id">): UserDto => ({
  name: payload.name,
  email: payload.email,
  gender: payload.gender,
  dateOfBirth: payload.dob,
  phone: payload.phone,
  department: payload.department,
});

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await axiosClient.get<BackendUser[]>("/api/Users");
    return data.map(mapFromBackend).sort((a, b) => a.name.localeCompare(b.name));
  },

  getById: async (id: string): Promise<User | null> => {
    const { data } = await axiosClient.get<BackendUser>(`/api/Users/${id}`);
    return data ? mapFromBackend(data) : null;
  },

  create: async (payload: Omit<User, "id">): Promise<User> => {
    const { data } = await axiosClient.post<BackendUser>("/api/Users", toDto(payload));
    return mapFromBackend(data);
  },

  update: async (id: string, payload: Omit<User, "id">): Promise<User> => {
    const { data } = await axiosClient.put<BackendUser>(`/api/Users/${id}`, toDto(payload));
    return mapFromBackend(data);
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/Users/${id}`);
  },
};
