import { auth0Api } from "./auth0-base";

export const getUser = (auth0Id: string) =>
  auth0Api.get("users/".concat(auth0Id));

// export const updateUser = (auth0Id: string) => {
//     auth0Api.patch
// }
