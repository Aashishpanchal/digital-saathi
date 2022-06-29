import { farmers, retailer } from "../http";
export function classNames(...classNames) {
    return classNames.filter(Boolean).join(" ");
}
export function validation(requiredFields, data) {
    let isValid = true;
    const validFields = {};
    requiredFields.forEach((field) => {
        if (data[field] === "") {
            isValid = false;
            validFields[field] = false;
        }
        else {
            validFields[field] = true;
        }
    });
    return {
        isValid,
        validFields,
    };
}
export function setEmpty(data, callback) {
    let clearData = {};
    Object.keys(data).forEach((key) => {
        if (typeof data[key] === "string") {
            clearData[key] = "";
        }
        else if (typeof data[key] === "boolean") {
            clearData[key] = false;
        }
        else if (typeof data[key] === "number") {
            clearData[key] = 0;
        }
    });
    callback(clearData);
}
export async function onFarmerRetrieve(customer_id) {
    try {
        const res = await farmers("get", {
            params: customer_id.toString(),
        });
        if (res?.status === 200) {
            return res.data.customer_name;
        }
    }
    catch (e) {
        if (e.response?.status === 404) {
            return "Not Found";
        }
    }
}
export async function onRetailerRetrieve(retailer_id) {
    try {
        const res = await retailer("get", {
            params: retailer_id.toString(),
        });
        if (res?.status === 200) {
            return res.data.retailer_name;
        }
    }
    catch (e) {
        if (e.response?.status === 404) {
            return "Not Found";
        }
    }
}
export function DateFormate(date) {
    return new Date(date).toDateString();
}
