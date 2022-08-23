import moment from "moment";
import { ToWords } from "to-words";

export function classNames(...classNames: string[]) {
  return classNames.filter(Boolean).join(" ");
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

export const removePostFix = (value: string): any => {
  const reg = /([\d]+(?:\.[\d]+)?(?![\d]))|([a-z.]+)(?![a-z.])/gi;
  return value.match(reg) || ["", ""];
};

export const globalConsoleLogDisable = () => {
  if (process.env.REACT_APP_MODE === "PROD") {
    console.log = () => {};
  }
};
