export const baseImageUrl = process.env.REACT_APP_BASE_IMAGE_URL;
export const baseUrl = process.env.REACT_APP_API_URL;

export const auth0BaseUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`;

export const auth0Config = {
  client_id: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
  client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET || "",
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  grant_type: process.env.REACT_APP_AUTH0_GRANT_TYPE || "",
};

console.log(auth0Config);
