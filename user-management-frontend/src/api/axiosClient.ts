// src/api/axiosClient.ts
import axios from "axios";

// Base API URL. Prefer Vite env (VITE_API_URL) and fallback to local backend
const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:5096";

const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
});

export default axiosClient;
