import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import themeSlice from "../slices/themeSlice";
import sideBarSlice from "../slices/sideBarSlice";
import alertSlice from "../slices/alertSlice";
export const store = configureStore({
    reducer: {
        authSlice,
        themeSlice,
        sideBarSlice,
        alertSlice,
    },
});
