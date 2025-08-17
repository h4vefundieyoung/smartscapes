import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { getRouteById } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	route: null | RouteGetByIdResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	route: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
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
	name: "route",
	reducers: {},
});

export { actions, name, reducer };
