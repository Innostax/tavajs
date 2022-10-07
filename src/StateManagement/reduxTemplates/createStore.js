import { configureStore } from "@reduxjs/toolkit";

let store;

export const getStore = () => store;

const createStore = (rootReducer) => {
    store = configureStore({
        reducer: rootReducer,
    });
    return store;
}

export default createStore;
