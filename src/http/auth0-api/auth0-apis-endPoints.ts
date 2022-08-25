import { auth0Api } from "./auth0-base";

export const getUser = (auth0Id: string) =>
  auth0Api.get("users/".concat(auth0Id));

export const getUsers = () => auth0Api.get("users");

export const updateUser = (user_id: string, data: { [key: string]: any }) =>
  auth0Api.patch("users/".concat(user_id), data);

export const deleteUser = (user_id: string) =>
  auth0Api.delete("users/".concat(user_id));
