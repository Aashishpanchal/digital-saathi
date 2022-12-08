import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import adminSlice from "../slices/admin-slice";
import acessTokenSlice from "../slices/acessTokenSlice"
import axios from "axios";


export const store = configureStore({

  reducer: {
    authSlice,
    adminSlice,
   
  },
  
  
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
