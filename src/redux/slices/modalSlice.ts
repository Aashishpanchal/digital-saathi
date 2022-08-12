import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface modalState {
  informationModal: {
    show?: boolean;
    title?: string;
    heading?: string;
    message?: string;
    runClose?: boolean;
    showLoading?: boolean;
  };
}

const initialState: modalState = {
  informationModal: {
    show: false,
    title: "",
    heading: "",
    message: "",
    runClose: false,
    showLoading: false,
  },
};

export const modalSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setInformationModal: (
      state: typeof initialState,
      action: PayloadAction<modalState["informationModal"]>
    ) => {
      state.informationModal = action.payload;
    },
    closeInformationModal: (state: typeof initialState) => {
      state.informationModal = initialState.informationModal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInformationModal, closeInformationModal } =
  modalSlice.actions;

export default modalSlice.reducer;
