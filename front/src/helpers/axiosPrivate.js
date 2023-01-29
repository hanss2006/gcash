import axios from "axios";

const axiosInstance = axios.create();
const baseURL = "/api/gcash";
axiosInstance.defaults.baseURL = baseURL;
axios.defaults.baseURL = baseURL;
axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = sessionStorage.getItem("token");

        if (!!accessToken) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${accessToken}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const axiosPrivate = axiosInstance;