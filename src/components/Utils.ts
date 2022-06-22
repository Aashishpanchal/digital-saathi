import React from "react";
import { farmers, retailer } from "../http";

export function classNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
}

export function validation<D>(requiredFields: Array<D>, data: any) {
  let isValid = true;
  const validFields: any = {};
  requiredFields.forEach((field) => {
    if (data[field] === "") {
      isValid = false;
      validFields[field] = false;
    } else {
      validFields[field] = true;
    }
  });
  return {
    isValid,
    validFields,
  };
}

export function setEmpty(
  data: { [key: string]: any },
  callback: (clearData: any) => void
) {
  let clearData: { [key: string]: any } = {};
  Object.keys(data).forEach((key) => {
    if (typeof (data as any)[key] === "string") {
      clearData[key] = "";
    } else if (typeof (data as any)[key] === "boolean") {
      clearData[key] = false;
    } else if (typeof (data as any)[key] === "number") {
      clearData[key] = 0;
    }
  });
  callback(clearData);
}

export async function onFarmerRetrieve(customer_id: number) {
  try {
    const res = await farmers("get", {
      params: customer_id.toString(),
    });
    if (res?.status === 200) {
      return res.data.customer_name;
    }
  } catch (e: any) {
    if (e.response?.status === 404) {
      return "Not Found";
    }
  }
}

export async function onRetailerRetrieve(retailer_id: number) {
  try {
    const res = await retailer("get", {
      params: retailer_id.toString(),
    });
    if (res?.status === 200) {
      return res.data.retailer_name;
    }
  } catch (e: any) {
    if (e.response?.status === 404) {
      return "Not Found";
    }
  }
}

export function DateFormate(date: string) {
  return new Date(date).toDateString();
}
