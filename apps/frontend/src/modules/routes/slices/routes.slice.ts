import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RoutesResponseDto } from "../libs/types/types.js";
import { findAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	error: null | string;
	routes: RoutesResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	routes: [],
};

// TODO: add actions

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(findAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
		});
		builder.addCase(findAll.fulfilled, (state, action) => {
			state.routes = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(findAll.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.error = action.error.message ?? "Failed to fetch routes.";
		});
	},
	initialState,
	name: "routes",
	reducers: {},
});

export { actions, name, reducer };
