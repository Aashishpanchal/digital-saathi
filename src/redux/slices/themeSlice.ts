import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  isDark: boolean;
  isLight: boolean;
}

const initialState: authState = {
  isDark: false,
  isLight: false,
};

export const themeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDark: (state, action: PayloadAction<authState["isDark"]>) => {
      state.isDark = action.payload;
      state.isLight = !state.isDark;
    },
    setLight: (state, action: PayloadAction<authState["isLight"]>) => {
      state.isLight = action.payload;
      state.isDark = !state.isLight;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDark, setLight } = themeSlice.actions;

export default themeSlice.reducer;
