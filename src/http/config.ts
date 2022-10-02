const env = import.meta.env;
export const baseUrl = env.VITE_BASE_URL;
export const auth0BaseUrl = `https://dev-pwaq157w.us.auth0.com/`;

export const auth0Config = {
  client_id: "3ywL4I5FpbCrn5auVuIUJygaYUrQhwQp",
  client_secret:
    "f7QeCrdXl84gitgwE5vXuJLGrcjizAzzK8IqsY97eFPnl8Evh5qzrWmnjj5V-9ch",
  audience: "https://dev-pwaq157w.us.auth0.com/api/v2/",
  grant_type: "client_credentials",
};

export const accessKeyId = env.VITE_APP_S3_ACCESS_KEY || "";
export const secretAccessKey = env.VITE_APP_S3_SECRET_ACCESS_KEY || "";
export const region = env.VITE_APP_S3_BUCKET_REGION || "";
export const bucketName = env.VITE_APP_S3_BUCKET_NAME || "";
