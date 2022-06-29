import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    open: false,
};
export const sideBarSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSideBarOpenClose: (state, action) => {
            state.open = action.payload;
        },
    },
});
// Action creators are generated for each case reducer function
export const { setSideBarOpenClose } = sideBarSlice.actions;
export default sideBarSlice.reducer;
