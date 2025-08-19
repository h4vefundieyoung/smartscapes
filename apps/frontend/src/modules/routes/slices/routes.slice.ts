import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RouteGetByIdResponseDto } from "./../libs/types/types.js";
import { create, getRouteById } from "./actions.js";

type State = {
	createStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	route: null | RouteGetByIdResponseDto;
	routes: RouteGetByIdResponseDto[];
};

const initialState: State = {
	createStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	route: null,
	routes: [],
};

const { actions, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.routes.push(action.payload.data);
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});
		builder.addCase(getRouteById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getRouteById.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getRouteById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "routes",
	reducers: {},
});

export { actions, reducer };
