import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jwtToken: null,
};

const slice = createSlice({
    name: "jwtToken",
    initialState,
    reducers: {
        setjwtToken(state, action) {
            state.jwtToken = action.payload;
        },
    },
});

export default slice;

export const { name, actions, reducer } = slice;
