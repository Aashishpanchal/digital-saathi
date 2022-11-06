import axios from "axios";
import { baseUrl } from "../config";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export type HttpMethod = "get" | "post" | "put" | "delete";
export type HttpOption = {
  data?: string | FormData;
  params?: string;
  postfix?: string;
};

export const baseFunc = (endURL: string) => {
  return (method: HttpMethod, options?: HttpOption) => {
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
