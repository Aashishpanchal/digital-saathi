export const baseUrl = process.env.REACT_APP_BASE_URL;
export const auth0BaseUrl = `https://dev-pwaq157w.us.auth0.com/`;
export const baseUrlImg =
  "https://api-dev.dev.dev-cglcloud.com/api/remoteassistance/digitalsaathi/v4";

export const auth0Config = {
  client_id: "3ywL4I5FpbCrn5auVuIUJygaYUrQhwQp",
  client_secret:
    "f7QeCrdXl84gitgwE5vXuJLGrcjizAzzK8IqsY97eFPnl8Evh5qzrWmnjj5V-9ch",
  audience: "https://dev-pwaq157w.us.auth0.com/api/v2/",
  grant_type: "client_credentials",
};

export const accessKeyId = process.env.REACT_APP_S3_ACCESS_KEY || "";
export const secretAccessKey = process.env.REACT_APP_S3_SECRET_ACCESS_KEY || "";
export const region = process.env.REACT_APP_S3_BUCKET_REGION || "";
export const bucketName = process.env.REACT_APP_S3_BUCKET_NAME || "";
export const imgJwt = process.env.REACT_APP_IMGJWT || "";
