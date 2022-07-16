import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import sideBarSlice from "../slices/sideBarSlice";
import alertSlice from "../slices/alertSlice";
import auth0Slice from "../slices/auth0Slice";

export const store = configureStore({
  reducer: {
    authSlice,
    sideBarSlice,
    alertSlice,
    auth0Slice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
