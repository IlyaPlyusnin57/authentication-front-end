import { isExpired } from "react-jwt";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const refresh_api = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

async function refreshToken(user) {
  try {
    const res = await refresh_api.post("auth/refresh", {
      userId: user._id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

function axiosConfig(user, setUserInfo) {
  axios.defaults.headers = { authorization: `Bearer ${user.accessToken}` };

  const axiosInterceptor = axios.interceptors.request.use(
    async (config) => {
      if (isExpired(user.accessToken)) {
        console.log("it was expired");
        const token = await refreshToken(user);
        setUserInfo({
          authed: true,
          user: { ...user, accessToken: token.accessToken },
        });
        config.headers["authorization"] = `Bearer ${token.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInterceptor;
}

export default axiosConfig;
