import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import adminSlice from "../slices/admin-slice";

import axios from "axios";
import acessTokenSlice from "../slices/acessTokenSlice";


export const store = configureStore({

  reducer: {
    authSlice,
    adminSlice,
    acessTokenSlice
  },


});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
