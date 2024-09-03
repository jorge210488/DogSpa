import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer"; // Importa el reducer que acabamos de definir

const store = configureStore({
    reducer: {
        user: userReducer, // Añade el user reducer
    },
});

export default store;
