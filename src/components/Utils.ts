import moment from "moment";
import { farmers, retailer } from "../http";
import { ToWords } from "to-words";

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

export function NumberToString(value: string): string {
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });
  const num = Number(value);
  if (isNaN(num)) {
    return "cannot translate";
  }
  return toWords.convert(num);
}
