import { baseUrlImg, imgJwt } from "../config";
import { api, baseFunc } from "./server-base";

// list of all the endpoints of farmers
export const farmers = baseFunc("shop_customer");
// list of all the endpoints of shop_warehouses
export const warehouse = baseFunc("shop_warehouses");
// list of all the endpoints of shop_retailer
export const retailer = baseFunc("shop_retailer");
// list of all the endpoints of shop_categories
export const categories = baseFunc("shop_categories");
// list of all the endpoints of shop_subcategories
export const subCategories = baseFunc("shop_subcategories");
// list of all the endpoints of shop_brands
export const brands = baseFunc("shop_brands");
// list of all the endpoints of shop_deliverypartners
export const deliveryPartners = baseFunc("shop_deliverypartners");
// list of all the endpoints of shop_deliveryretailer
export const deliveryRetailer = baseFunc("shop_deliveryretailer");
export const shopDeliveryAgent = baseFunc("shop_deliveryagents");
// list of all the endpoints of shop_products
export const shopProducts = baseFunc("shop_products");
// list of all the endpoints of shop_productweightprice
export const shopProductWeightPrice = baseFunc("shop_productweightprice");
// list of all the endpoints of shop_productimages
export const shopProductImages = baseFunc("shop_productimages");
// list of all the endpoints of shop_packages
export const shopPackages = baseFunc("shop_packages");
// list of all the endpoints of shop_units
export const shopUnits = baseFunc("shop_units");
// list of all the endpoints of shop_areas
export const shopAreas = baseFunc("shop_areas");
// list of all the endpoints of shop_orders
export const shopOrders = baseFunc("shop_orders");
export const shopOrderDetails = baseFunc("shop_orderdetails");

// Retailer Dashboard api's
export const shopRetailerProductPrice = baseFunc("shop_retailerproductprice");
export const shopAssignRetailerProducts = baseFunc(
  "shop_assignretailerproducts"
);
export const shopRetailerArea = baseFunc("shop_retailerareas");
export const shopPartnerArea = baseFunc("shop_partnerareas");
// shop banner api
export const shopBanner = baseFunc("shop_banners");
export const shopBannerUpload = (
  method: "post" | "put",
  data: FormData,
  url: string = ""
) =>
  api.request({
    method: method.toUpperCase(),
    url: `shop_uploadbanner${url ? `/${url}` : url}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${imgJwt}`,
    },
  });
export const shopBannerImgDownLoad = (img: any) =>
  api.request({
    url: `${baseUrlImg}${img || ""}`,
    method: "GET",
    responseType: "blob",
    headers: {
      Accept: "*/*",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InltOGRRa1Z6dTF6a1Z2ZklydURSNyJ9.eyJpc3MiOiJodHRwczovL2RpZ2l0YWxzYWF0aGktZGV2LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJzbXN8NjM1Y2MzMDdlYTk3ODgwNzM3MzU0OTA5IiwiYXVkIjpbImh0dHBzOi8vZGlnaXRhbHNhYXRoaS1kZXYuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2RpZ2l0YWxzYWF0aGktZGV2LmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NjcwMjM2MjksImV4cCI6MTY2OTYxNTYyOSwiYXpwIjoiSHdtUkM0akIxd1dmdE44bXlmSmJ4R2dpWnVaQURVamUiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgZGVsZXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpjdXJyZW50X3VzZXJfaWRlbnRpdGllcyBvZmZsaW5lX2FjY2VzcyIsImd0eSI6InBhc3N3b3JkIn0.oXZps5mfzf1xiJHnCDYbNV9gSn8Q2_vfFN9tG1F3FKvTU92fekc9Xj3lW51ix9ByAwC3-8Mv0mt8Dc_XkZkS_z7tR3i039LPu_aV6D3yPLU_aacjjpKwcgyF9afzjXydPXgMs2VQfTZFwDEU_pozbeV3r41kYEX5TgnDAJ3QOUAO5N-effaAruU2_n2RRO-PROE7f-kg6iPVgrMWjQpy6J350nCAcU7UklK2lGgnbJUU5LXT-jupUAGpwowJzNQPpCA6FJ8Xg5Zryc9hEqY6qrKu83VDu5S9u6HhGaWiLvxtzdzYdtCIeHvNvD-9GJg5ih6lqWdwc6y68drDtxvYDw",
    },
  });

// shop delivery charge api
export const shopDeliveryCharge = baseFunc("shop_deliverycharges");

// shop reason
export const shopReason = baseFunc("shop_reason");
