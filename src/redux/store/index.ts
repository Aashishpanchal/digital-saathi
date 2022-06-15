import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import themeSlice from "../slices/themeSlice";
import sideBarSlice from "../slices/sideBarSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    themeSlice,
    sideBarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
