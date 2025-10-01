import axios from "axios";

export const newsApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});
