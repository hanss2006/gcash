import axios from "axios";

const axiosInstance = axios.create();


const baseURL = "/api/gcash";
axiosInstance.defaults.baseURL = baseURL;
axios.defaults.baseURL = baseURL;
axiosInstance.interceptors.request.use(
    async (config) => {
        const session = JSON.parse(sessionStorage.getItem("session"));

        if (session?.user?.access_token) {
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${session?.user?.access_token}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;
            const session = JSON.parse(sessionStorage.getItem("session"));
            const {refresh_token} = session.user;
            const result = await axios.post("/auth/refresh", {
                token: refresh_token,
            });
            if (result?.data?.access_token) {
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result?.data?.access_token}`,
                };
                const newAuthState = {
                    isLoggedIn: true,
                    user: result?.data,
                };
                sessionStorage.setItem("session", JSON.stringify(newAuthState));
            }

            return axios(config);
        }
        return Promise.reject(error);
    }
);

export const axiosPrivate = axiosInstance;