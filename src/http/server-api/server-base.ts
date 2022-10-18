import axios from "axios";
import { baseUrl } from "../config";

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const baseFunc = (endURL: string) => {
  return (
    method: "get" | "post" | "put" | "delete",
    options?: {
      data?: string | FormData;
      params?: string;
      postfix?: string;
    }
  ) => {
    const params = options?.params ? "/" + options.params : "";
    let url = `/${endURL}${params}`;
    if (options?.postfix) {
      url += options.postfix;
    }
    const header = {
      "Content-Type":
        options?.data instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    };
    if (method.toLowerCase() === "get") {
      return api.get(url);
    } else if (method.toLowerCase() === "post") {
      return api.post(url, options?.data, { headers: header });
    } else if (method.toLowerCase() === "put") {
      return api.put(url, options?.data, { headers: header });
    } else if (method.toLowerCase() === "delete") {
      return api.delete(url, {
        headers: header,
        data: JSON.stringify({ deleted: 1 }),
      });
    }
  };
};
