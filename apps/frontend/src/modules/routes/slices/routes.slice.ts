import { createSlice } from "@reduxjs/toolkit";

import { type RoutesResponseDto } from "@smartscapes/shared";

import { create } from "./actions.js";

type State = {
	routes: RoutesResponseDto[];
};

const initialState: State = {
	routes: [],
};

const { actions, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.fulfilled, (state, action) => {
			state.routes.push(action.payload.data);
		});
	},
	initialState,
	name: "routes",
	reducers: {},
});

export { actions, reducer };
