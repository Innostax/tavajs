import { createAsyncThunk } from "@reduxjs/toolkit";
import asyncAction from "../../infrastructure/asyncAction";
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (thunkArgs) =>
        await asyncAction({
            url: "<%= defaultRoute %>",
            ...thunkArgs,
        })
);

export const addUsers = createAsyncThunk(
    "users/getUsers/ADD",
    async ({ name, username, email }, thunkArgs) => {
        return await asyncAction({
            url: "<%= defaultRoute %>",
            methodType: "post",
            httpHeaders: {
                body: JSON.stringify({
                    name,
                    username,
                    email,
                }),
            },
            ...thunkArgs,
        });
    }
);

export const deleteUsers = createAsyncThunk(
    "users/getUsers/delete",
    async ({ id }, thunkArgs) => {
        return await asyncAction({
            url: `<%= defaultRoute %>/${id}`,
            methodType: "delete",
            ...thunkArgs,
        });
    }
);
export const updateUsers = createAsyncThunk(
    "users/getUsers/update",
    async ({ id, name, username, email }, thunkArgs) => {
        return await asyncAction({
            url: `<%= defaultRoute %>/${id}`,
            methodType: "patch",
            httpHeaders: {
                body: JSON.stringify({
                    name,
                    username,
                    email,
                }),
            },
            ...thunkArgs,
        });
    }
);
