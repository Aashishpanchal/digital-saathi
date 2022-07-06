import moment from "moment";
import React from "react";
import { farmers, retailer } from "../http";

export function classNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
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
  return moment(date).format("YYYY-MM-DD");
}
