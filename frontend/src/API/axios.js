import axios from "axios";

console.log(import.meta.env.VITE_APP_URL);

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;