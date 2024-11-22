import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null, // Carga desde localStorage
    userAppointments: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // Almacena en localStorage
        },
        clearUser: (state) => {
            state.user = null;
            localStorage.removeItem("user"); // Elimina del localStorage
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
