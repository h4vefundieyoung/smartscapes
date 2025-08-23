import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { getById, patch } from "./actions.js";

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
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(patch.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "route-details",
	reducers: {},
});

export { actions, name, reducer };
