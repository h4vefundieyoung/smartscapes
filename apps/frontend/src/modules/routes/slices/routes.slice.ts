import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RoutesResponseDto } from "../libs/types/types.js";
import { findByPoint } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	routes: RoutesResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	routes: [],
};

// TODO: add actions

const { name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(findByPoint.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(findByPoint.fulfilled, (state, action) => {
			state.routes = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(findByPoint.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "routes",
	reducers: {},
});

export { name, reducer };
