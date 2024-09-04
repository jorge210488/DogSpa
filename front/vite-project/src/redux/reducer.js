import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
    userAppointments: [], 
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        setUserAppointments: (state, action) => {
            state.userAppointments = action.payload;
        },
        clearUserAppointments: (state) => {
            state.userAppointments = [];
        },
    },
});

export const { setUser, clearUser, setUserAppointments, clearUserAppointments } = userSlice.actions;

export default userSlice.reducer;

