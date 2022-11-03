import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ToWords } from "to-words";
import dayjs from "dayjs";

export const getPayload = (
  original: { [key: string]: any },
  payload?: Array<string>
) => {
  let result: { [key: string]: any } = {};
  if (payload) {
    payload?.map((item) => {
      result[item] = original[item];
    });
  }
  return result;
};

export const margeObj = (
  init: { [key: string]: any },
  data: { [key: string]: any }
) => {
  let newObj: { [key: string]: any } = {};
  Object.keys(init).forEach((key) => {
    newObj[key] = data[key] === null ? "" : data[key];
  });
  return newObj;
};

export const queryToStr = (queryObj: { [key: string]: any }) => {
  const query = [];
  for (const key in queryObj) {
    query.push(
      encodeURIComponent(key)
        .concat("=")
        .concat(encodeURIComponent(queryObj[key]))
    );
  }
  return query.length ? query.join("&") : "";
};

export const nullFree = (value: any) => {
  if (value === undefined || value === null) return 0;
  return value;
};

export const reactToPdf = async (ref: any, saveName: string) => {
  const canvas = await html2canvas(ref);
  const data = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "pt", "a4", false);
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(saveName);
};

export const totalGst = (totalAmount: number, igst: string) => {
  const i = parseFloat(igst);
  const igstNum = isNaN(i) ? 0 : i;
  return {
    gst: totalAmount / (1 + igstNum / 100),
    igstNum,
  };
};

export function numberToEnIn(value: string): string {
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
    return "Zero";
  }
  return toWords.convert(num, {
    doNotAddOnly: true,
  });
}

export const filterPhoneNo = (phone: string, r91?: boolean) => {
  if (phone) {
    const spaceFree = phone.replace(/\s/g, "");
    return r91
      ? spaceFree.replace("+91", "")
      : spaceFree.includes("+91")
      ? spaceFree
      : "+91" + spaceFree;
  }
  return "";
};

// !Table Units Start
export const beforeTableNullFreeEncoder = (
  entries: {
    fieldName: string;
    fieldValues: string[];
  }[]
) =>
  entries.map((values) => {
    values.fieldValues = values.fieldValues.map((value) =>
      value === "null" ? "" : value
    );
    return values;
  });

export const addSno = (
  data: Array<Record<string, any>>,
  keyName: string = "s_no"
) =>
  data.map((row, index) => ({
    [keyName]: index + 1,
    ...row,
  }));

export const beforeTableOrderStatusEncoder = (
  entries: {
    fieldName: string;
    fieldValues: string[];
  }[],
  fieldName: string = "order_status"
) =>
  entries.map((values) => {
    if (values.fieldName === fieldName) {
      values.fieldValues = values.fieldValues.map((value) =>
        value === "0"
          ? "New"
          : value === "1"
          ? "Accepted"
          : value === "3"
          ? "Picked-up"
          : value === "5"
          ? "Delivered"
          : value === "7"
          ? "Reject By Farmer"
          : value === "9"
          ? "Rejected"
          : ""
      );
    }
    return values;
  });

export const orderStatusReadable = (
  data: Array<Record<string, any>>,
  extractName: string = "order_status",
  addKeyName: string = "order_status"
) =>
  data.map((row) => ({
    ...row,
    [addKeyName]:
      row[extractName] === 0
        ? "New"
        : row[extractName] === 1
        ? "Accepted"
        : row[extractName] === 3
        ? "Picked-up "
        : row[extractName] === 5
        ? "Delivered"
        : row[extractName] === 7
        ? "Reject By Farmer"
        : row[extractName] === 9
        ? "Rejected"
        : null,
  }));

export const dateTimeFormatTable = (
  data: Array<Record<string, any>>,
  dateExtractKeyName: string,
  addTimeKeyName: string
) =>
  data.map((row) =>
    row[dateExtractKeyName]
      ? {
          ...row,
          [dateExtractKeyName]: dayjs(row[dateExtractKeyName]).format(
            "D-MMM-YYYY"
          ),
          [addTimeKeyName]: dayjs(row[dateExtractKeyName]).format("h:mm A"),
        }
      : row
  );

export const margeRowTable = (
  data: Array<Record<string, any>>,
  whoMarge: Array<string>,
  nameOfCol: string
) =>
  data.map((row) => ({
    ...row,
    [nameOfCol]: whoMarge.reduce((p, c) =>
      whoMarge[0] === p && whoMarge[1] === c
        ? `${row[p] ? row[p] : ""} (${row[c] ? row[c] : ""})`
        : `${p ? p : ""} (${row[c] ? row[c] : ""})`
    ),
  }));

// !Table Units End
