import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuth: false,
    user: {
        id: "",
        email: "",
        username: "",
        permissions: {
            isAdmin: false,
            isActive: false,
        },
    },
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },
        setLogout: (state) => {
            state.isAuth = false;
            state.user = undefined;
        },
    },
});
// Action creators are generated for each case reducer function
export const { setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;
