import axios from "axios";
import { auth0BaseUrl, auth0Config } from "../config";

export const auth0Api = axios.create({
  baseURL: auth0BaseUrl.concat("api/v2/"),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
  },
});

export const getAuth0AdminToken = () =>
  axios.post(auth0BaseUrl.concat("oauth/token"), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify(auth0Config),
  });

// get token on expired
auth0Api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      try {
        const res = await getAuth0AdminToken();
        if (res.status === 200) {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
);
