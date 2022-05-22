import axios from "axios";

const ax = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: { "Content-Type": "application/json" },
});

export default ax;
