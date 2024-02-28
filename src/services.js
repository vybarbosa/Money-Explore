import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://brapi.dev/api"
})

export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint)
    },
};