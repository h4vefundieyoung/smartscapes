import { createSlice } from "@reduxjs/toolkit";
import { type RoutesResponseDto } from "@smartscapes/shared";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { getRoute } from "./actions.js";

type State = {
	data: RoutesResponseDto | RoutesResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	data: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getRoute.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getRoute.fulfilled, (state, action) => {
			state.data = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getRoute.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "routes",
	reducers: {},
});

export { actions, name, reducer };
