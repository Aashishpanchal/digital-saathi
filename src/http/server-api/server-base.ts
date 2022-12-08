import axios from "axios";
import { baseUrl, imgJwt } from "../config";

export const api = axios.create({
  baseURL: baseUrl,
  // timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const api2 = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InltOGRRa1Z6dTF6a1Z2ZklydURSNyJ9.eyJpc3MiOiJodHRwczovL2RpZ2l0YWxzYWF0aGktZGV2LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJzbXN8NjJkNTBkNGIyNmU2YTFjOWQ5ZDRlZmRhIiwiYXVkIjpbImh0dHBzOi8vZGlnaXRhbHNhYXRoaS1kZXYuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2RpZ2l0YWxzYWF0aGktZGV2LmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2Njk2MDY4OTIsImV4cCI6MTY3MjE5ODg5MiwiYXpwIjoiSHdtUkM0akIxd1dmdE44bXlmSmJ4R2dpWnVaQURVamUiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgZGVsZXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBjcmVhdGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpjdXJyZW50X3VzZXJfZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpjdXJyZW50X3VzZXJfaWRlbnRpdGllcyBvZmZsaW5lX2FjY2VzcyIsImd0eSI6InBhc3N3b3JkIn0.iruqoFHVshB3Zbdk2HXLVQLS0mEiO11FeuRUcYok7uiNfQetc_4f0a6EAM2WqkWTwe1qTEgO9YHe0_1S-uij5w0eEdvp8ns9_dHCCw4ax-xe2JJiyAkogo-b6WBvNEbmBNx1_jmRNY9t-axzDc7HLtm7yxfSnW5j2yaJKl-HHDqgrZWYAL4eZuQatf82MvZB0DbKP8j7ghaB71by0Y0rPMpVYWl-k8MrlngupmSwTg42K8e2lj7d1ONhGYTwNx88O-7_MyraYXi7I8thVNch6sdE7jH08C7VIOags4afWDCL-3zbINMpsS8pwHPr8yWvMQNV3yA0oSnYeNucX0lwlA`,
    // token: `Bearer ${imgJwt}`,
  },
});

export type HttpMethod = "get" | "post" | "put" | "delete";
export type HttpOption = {
  data?: string | FormData;
  params?: string;
  postfix?: string;
};

export const baseFunc = (endURL: string) => {
  return (method: HttpMethod, options?: HttpOption) => {
    const params = options?.params ? "/" + options.params : "";
    let url = `/${endURL}${params}`;
    if (options?.postfix) {
      url += options.postfix;
    }
    const header = {
      "Content-Type":
        options?.data instanceof FormData
          ? "multipart/form-data"
          : "application/json",
        Authorization: "Bearer "+localStorage.getItem("access_token")
    };
    if (method.toLowerCase() === "get" ) {
      return api.get(url, {headers:{
        Authorization:"Bearer "+localStorage.getItem("access_token")
      }});
    } else if (method.toLowerCase() === "post") {
      return api.post(url, options?.data, { headers: header });
    } else if (method.toLowerCase() === "put") {
      return api.put(url, options?.data, { headers: header });
    } else if (method.toLowerCase() === "delete") {
      return api.delete(url, {
        headers: header,
        data: JSON.stringify({ deleted: 1 }),
      });
    }
  };
};
