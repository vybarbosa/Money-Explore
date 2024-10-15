import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://brapi.dev/api"
})

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint)
},
};

export const fetchActionsHigh = async () => {
  const response = await api.get(`/quote/list?type=stock&sortBy=change&sortOrder=desc&limit=6&token=${import.meta.env.VITE_API_KEY}`);
  return response.data.stocks;
};

export const fetchActionsLow = async () => {
  const response = await api.get(`/quote/list?type=stock&sortBy=change&sortOrder=asc&limit=6&token=${import.meta.env.VITE_API_KEY}`);
  return response.data.stocks;
};