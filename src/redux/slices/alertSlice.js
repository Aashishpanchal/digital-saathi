import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
        setFormAlert: (state, action) => {
            state.formAlert = action.payload;
        },
        setTableAlert: (state, action) => {
            state.tableAlert = action.payload;
        },
    },
});
// Action creators are generated for each case reducer function
export const { setFormAlert, setTableAlert } = alertSlice.actions;
export default alertSlice.reducer;
