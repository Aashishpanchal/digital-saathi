import axios from "axios";
import { baseUrl } from "./config";

export const api = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// list of all the endpoints of farmers
export const farmers = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_customer${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
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
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_retailer${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_categories
export const categories = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_categories${params}`;
  const header = {
    "Content-Type":
      options?.data instanceof FormData
        ? "multipart/form-data"
        : "application/json",
  };
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data, { headers: header });
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data, { headers: header });
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_subcategories
export const subCategories = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_subcategories${params}`;
  const header = {
    "Content-Type":
      options?.data instanceof FormData
        ? "multipart/form-data"
        : "application/json",
  };
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data, { headers: header });
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data, { headers: header });
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_brands
export const brands = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_brands${params}`;
  const header = {
    "Content-Type":
      options?.data instanceof FormData
        ? "multipart/form-data"
        : "application/json",
  };
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data, { headers: header });
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data, { headers: header });
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_deliverypartners
export const deliveryPartners = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_deliverypartners${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_deliveryretailer
export const deliveryRetailer = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  const url = `/shop_deliveryretailer${params}`;
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

// list of all the endpoints of shop_products
export const shopProducts = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_products${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_productweightprice
export const shopProductWeightPrice = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_productweightprice${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_productimages
export const shopProductImages = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_productimages${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_packages
export const shopPackages = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_packages${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_units
export const shopUnits = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_units${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_areas
export const shopAreas = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_areas${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};

// list of all the endpoints of shop_orders
export const shopOrders = (
  method: "get" | "post" | "put" | "delete",
  options?: {
    data?: string | FormData;
    params?: string;
    postfix?: string;
  }
) => {
  const params = options?.params ? "/" + options.params : "";
  let url = `/shop_orders${params}`;
  if (method.toLowerCase() === "get") {
    if (options?.postfix) {
      url += options.postfix;
    }
    return api.get(url);
  } else if (method.toLowerCase() === "post") {
    return api.post(url, options?.data);
  } else if (method.toLowerCase() === "put") {
    return api.put(url, options?.data);
  } else if (method.toLowerCase() === "delete") {
    return api.delete(url);
  }
};
