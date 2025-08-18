import { createSlice } from "@reduxjs/toolkit";

import { initialize } from "./actions.js";

type State = {
	isInitialized: boolean;
};

const initialState: State = {
	isInitialized: false,
};

const { actions, name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder.addCase(initialize, (state) => {
			state.isInitialized = true;
		});
	},
	initialState,
	name: "app",
	reducers: {},
});

export { actions, name, reducer };
