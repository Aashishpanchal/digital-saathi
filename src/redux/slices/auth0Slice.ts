import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface auth0State {
  isAuthenticationByAuth0: boolean;
  tokenInfo?: {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  };
}

const initialState: auth0State = {
  isAuthenticationByAuth0: false,
  tokenInfo: {
    access_token: "",
    expires_in: 0,
    token_type: "",
    scope: "",
  },
};

export const auth0Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth0TokenInfo: (
      state: typeof initialState,
      action: PayloadAction<auth0State["tokenInfo"]>
    ) => {
      state.tokenInfo = action.payload;
      state.isAuthenticationByAuth0 = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth0TokenInfo } = auth0Slice.actions;

export default auth0Slice.reducer;
