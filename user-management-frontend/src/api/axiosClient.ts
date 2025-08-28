// src/api/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/users", // replace when backend ready
  timeout: 5000,
});

export default axiosClient;
