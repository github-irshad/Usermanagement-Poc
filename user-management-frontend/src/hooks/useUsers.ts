// src/hooks/useUsers.ts
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { userApi } from "../api/userApi";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (e: any) {
      setError(e.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (payload: Omit<User, "id">) => {
    const created = await userApi.create(payload);
    setUsers((s) => [...s, created].sort((a, b) => a.name.localeCompare(b.name)));
    return created;
  };

  const update = async (id: string, payload: Omit<User, "id">) => {
    const updated = await userApi.update(id, payload);
    setUsers((s) => s.map((u) => (u.id === id ? updated : u)).sort((a, b) => a.name.localeCompare(b.name)));
    return updated;
  };

  const remove = async (id: string) => {
    await userApi.delete(id);
    setUsers((s) => s.filter((u) => u.id !== id));
  };

  return { users, loading, error, reload: load, add, update, remove };
}
