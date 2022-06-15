import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// list of all the endpoints of farmers
export const farmers = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string;
    params?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  const url = `/shop_customer${params}`;
  if (method.toLowerCase() === "get") {
    return api.get(url);
  }
  if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  }
  if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  }
  if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_warehouses
export const warehouse = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string;
    params?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  const url = `/shop_warehouses${params}`;
  if (method.toLowerCase() === "get") {
    return api.get(url);
  }
  if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  }
  if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  }
  if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_retailer
export const retailer = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string;
    params?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  const url = `/shop_retailer${params}`;
  if (method.toLowerCase() === "get") {
    return api.get(url);
  }
  if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  }
  if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  }
  if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};
