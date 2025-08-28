// src/api/userApi.ts
import { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";

/**
 * In-memory store + localStorage persistence for convenience.
 * Methods mirror typical axios responses: return Promise resolving the data.
 */

const STORAGE_KEY = "um_users_v1";

const seed = (): User[] => [
  {
    id: uuidv4(),
    name: "Akhil N",
    email: "akhil@example.com",
    gender: "Male",
    dob: "1996-05-12",
    phone: "+91 90000 11111",
    department: "Engineering",
  },
  {
    id: uuidv4(),
    name: "Neha S",
    email: "neha@example.com",
    gender: "Female",
    dob: "1994-02-02",
    phone: "+91 90000 22222",
    department: "Marketing",
  },
];

const load = (): User[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const s = seed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return s;
  }
  try {
    return JSON.parse(raw) as User[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    const s = seed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return s;
  }
};

let store = load();

const persist = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(store));

export const userApi = {
  getAll: async (): Promise<User[]> => {
    await new Promise((r) => setTimeout(r, 150)); // simulate latency
    // sorted by name
    return [...store].sort((a, b) => a.name.localeCompare(b.name));
  },

  getById: async (id: string): Promise<User | null> => {
    await new Promise((r) => setTimeout(r, 100));
    return store.find((u) => u.id === id) ?? null;
  },

  create: async (payload: Omit<User, "id">): Promise<User> => {
    await new Promise((r) => setTimeout(r, 200));
    // simple unique email check
    if (store.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
      const err = new Error("Email already in use");
      // attach code like axios would
      (err as any).status = 409;
      throw err;
    }
    const created: User = { id: uuidv4(), ...payload };
    store.push(created);
    persist();
    return created;
  },

  update: async (id: string, payload: Omit<User, "id">): Promise<User> => {
    await new Promise((r) => setTimeout(r, 200));
    const idx = store.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error("Not found");
    // email uniqueness except current
    if (store.some((u) => u.email.toLowerCase() === payload.email.toLowerCase() && u.id !== id)) {
      const err = new Error("Email already in use");
      (err as any).status = 409;
      throw err;
    }
    const updated: User = { id, ...payload };
    store[idx] = updated;
    persist();
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise((r) => setTimeout(r, 150));
    store = store.filter((u) => u.id !== id);
    persist();
  },
};
