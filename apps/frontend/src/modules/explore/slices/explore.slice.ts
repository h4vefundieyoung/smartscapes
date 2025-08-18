import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { getRoutes } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	error: null | string;
	loading: boolean;
	routes: RouteGetByIdResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	loading: false,
	routes: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder.addCase(getRoutes.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
			state.loading = true;
			state.routes = [];
		});
		builder.addCase(getRoutes.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.error = null;
			state.loading = false;
			state.routes = action.payload;
		});
		builder.addCase(getRoutes.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.error = action.payload ?? "Unknown error occurred.";
			state.loading = false;
			state.routes = [];
		});
	},
	initialState,
	name: "explore",
	reducers: {},
});

export { actions, name, reducer };
