import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface slideBarState {
  open: boolean;
}

const initialState: slideBarState = {
  open: false,
};

export const sideBarSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSideBarOpenClose: (
      state,
      action: PayloadAction<slideBarState["open"]>
    ) => {
      state.open = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSideBarOpenClose } = sideBarSlice.actions;

export default sideBarSlice.reducer;
