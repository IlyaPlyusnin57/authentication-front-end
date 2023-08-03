import { isExpired } from "react-jwt";
import { ApiCalls } from "./ApiCalls";
import { useEffect } from "react";
import { refresh_api, main_api } from "./axiosDefaultSettings";
import { useAuth } from "../context/AuthContext";

async function refreshToken(user, setUserInfo) {
  try {
    const res = await refresh_api.post("auth/refresh", {
      userId: user._id,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    await ApiCalls.logout(user, setUserInfo);
  }
}

export default function useAxiosConfig() {
  const {
    userInfo: { user },
    setUserInfo,
  } = useAuth();

  useEffect(() => {
    const axiosInterceptor = main_api.interceptors.request.use(
      async (config) => {
        const accessToken = sessionStorage.getItem("accessToken");
        config.headers["Authorization"] = `Bearer ${accessToken}`;

        if (isExpired(accessToken)) {
          console.log("it was expired");
          const token = await refreshToken(user, setUserInfo);
          sessionStorage.setItem("accessToken", token.accessToken);
          config.headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      main_api.interceptors.request.eject(axiosInterceptor);
    };
  }, []);

  return main_api;
}
