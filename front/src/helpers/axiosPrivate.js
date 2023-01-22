import axios from "axios";
import {useContext, useEffect} from "react";
import {KeycloackContext} from "../KeycloakContext";

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

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config?.sent) {
            const {keycloackValue, authenticated} = useContext(KeycloackContext)
            useEffect(() => {
                if (keycloackValue && authenticated) {
                    keycloackValue.onTokenExpired = () => keycloackValue.updateToken(600);
                }
                return () => {
                    if (keycloackValue) keycloackValue.onTokenExpired = () => {
                    };
                };
            }, [authenticated, keycloackValue]);
        }
        return Promise.reject(error);
    }
);

export const axiosPrivate = axiosInstance;