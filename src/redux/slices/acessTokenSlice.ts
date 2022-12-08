import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios"


export const getAcessToken = createAsyncThunk(
  "acessToken/getData",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("https://cargillcustomer-qa.oktapreview.com/oauth2/aushb5mlqe4IiZu3k0h7/v1/token", {

        grant_type: "password",
        redirect_uri: "https://digitalsaathi-cms.dev.cglcloud.in/login",
        username: "support@digitalsaathi.com",
        password: "tkq6exz.txv7qpu_PFN",
        scope: "openid profile email offline_access",
        client_id: "0oauvcg8f8ccy7CBU0h7"


      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "JSESSIONID=82716910C0B3A83A8C773C434FAE070F"
        }
      })
      console.log(data)
      return data

    } catch (err) {
      rejectWithValue(err)
    }
  }
)

export interface acessTokenState {
  loading: boolean;
  data?: string;
  token?: {
    id: string;
    username: string;
    email: string;
    //permissions
    permissions: {
      isAdmin: boolean;
      isActive: boolean;
    };
  };
}

const initialState: acessTokenState = {
  loading: false,


};

export const acessTokenSlice = createSlice({
  name: "acessToken",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAcessToken.pending, (state: typeof initialState) => {
      state.loading = true
    });
    builder.addCase(getAcessToken.fulfilled, (state: typeof initialState) => {
      state.loading = false

    }); builder.addCase(getAcessToken.rejected, (state: typeof initialState) => {
      state.loading = false
    });
  }
});

// Action creators are generated for each case reducer function


export default acessTokenSlice;
