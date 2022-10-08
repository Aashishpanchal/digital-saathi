import dayjs from "dayjs";
import moment from "moment";
import { ToWords } from "to-words";

export function classNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
}

export function DateFormate(date: string, readable?: boolean) {
  const dateM = moment(date);
  if (!readable) return dateM.format("YYYY-MM-DD");
  return dayjs(dateM.toLocaleString()).format("MMMM D, YYYY h:mm A");
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

export const removePostFix = (value: string): any => {
  const reg = /([\d]+(?:\.[\d]+)?(?![\d]))|([a-z.]+)(?![a-z.])/gi;
  return value.match(reg) || ["", ""];
};

export const textReduce = (text: string, len: number) => {
  return text.length > len ? text.slice(0, len) + "..." : text;
};

export const numberToString = (data: { [key: string]: any }) => {
  let obj: any = {};
  for (const key in data) {
    if (typeof data[key] === "number") {
      obj[key] = data[key].toString();
    }
  }
  return { ...data, ...obj };
};
