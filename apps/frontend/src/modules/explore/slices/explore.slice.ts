import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { getRoutes } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	error: null | string;
	routes: RouteGetByIdResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	routes: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder.addCase(getRoutes.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
			state.routes = [];
		});
		builder.addCase(getRoutes.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.error = null;
			state.routes = action.payload;
		});
		builder.addCase(getRoutes.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.error = action.payload ?? "Unknown error occurred.";
			state.routes = [];
		});
	},
	initialState,
	name: "explore",
	reducers: {},
});

export { actions, name, reducer };
