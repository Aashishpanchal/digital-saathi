import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface alertState {
  formAlert: {
    type: string;
    highLight: string;
    text: string;
    show: boolean;
  };
  tableAlert: { type: string; highLight: string; text: string; show: boolean };
}

const initialState: alertState = {
  formAlert: {
    type: "",
    highLight: "",
    text: "",
    show: false,
  },
  tableAlert: {
    type: "",
    highLight: "",
    text: "",
    show: false,
  },
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setFormAlert: (state, action: PayloadAction<alertState["formAlert"]>) => {
      state.formAlert = action.payload;
    },
    setTableAlert: (state, action: PayloadAction<alertState["tableAlert"]>) => {
      state.tableAlert = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFormAlert, setTableAlert } = alertSlice.actions;

export default alertSlice.reducer;
