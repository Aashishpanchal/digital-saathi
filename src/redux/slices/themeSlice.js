import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isDark: false,
    isLight: false,
};
export const themeSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setDark: (state, action) => {
            state.isDark = action.payload;
            state.isLight = !state.isDark;
        },
        setLight: (state, action) => {
            state.isLight = action.payload;
            state.isDark = !state.isLight;
        },
    },
});
// Action creators are generated for each case reducer function
export const { setDark, setLight } = themeSlice.actions;
export default themeSlice.reducer;
