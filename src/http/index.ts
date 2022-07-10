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

const baseFunc = (endURL: string) => {
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
}

// list of all the endpoints of farmers
export const farmers = baseFunc("shop_customer")
// list of all the endpoints of shop_warehouses
export const warehouse = baseFunc("shop_warehouses")
// list of all the endpoints of shop_retailer
export const retailer = baseFunc("shop_retailer")
// list of all the endpoints of shop_categories
export const categories = baseFunc("shop_categories")
// list of all the endpoints of shop_subcategories
export const subCategories = baseFunc("shop_subcategories")
// list of all the endpoints of shop_brands
export const brands = baseFunc("shop_brands")
// list of all the endpoints of shop_deliverypartners
export const deliveryPartners = baseFunc("shop_deliverypartners")
// list of all the endpoints of shop_deliveryretailer
export const deliveryRetailer = baseFunc("shop_deliveryretailer")
// list of all the endpoints of shop_products
export const shopProducts = baseFunc("shop_products")
// list of all the endpoints of shop_productweightprice
export const shopProductWeightPrice = baseFunc("shop_productweightprice")
// list of all the endpoints of shop_productimages
export const shopProductImages = baseFunc("shop_productimages")
// list of all the endpoints of shop_packages
export const shopPackages = baseFunc("shop_packages")
// list of all the endpoints of shop_units
export const shopUnits = baseFunc("shop_units")
// list of all the endpoints of shop_areas
export const shopAreas = baseFunc("shop_areas")
// list of all the endpoints of shop_orders
export const shopOrders = baseFunc("shop_orders")
