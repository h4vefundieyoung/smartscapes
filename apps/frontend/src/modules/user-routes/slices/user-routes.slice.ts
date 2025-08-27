import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const { actions, name } = createSlice({
	initialState,
	name: "user-routes",
	reducers: {},
});

export { actions, name };
