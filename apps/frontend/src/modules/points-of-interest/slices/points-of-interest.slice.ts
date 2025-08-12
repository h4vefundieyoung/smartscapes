import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { create } from "./actions.js";

type State = {
	data: null | PointsOfInterestResponseDto;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	data: null,
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, { payload }) => {
			state.data = payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "points-of-interest",
	reducers: {},
});

export { actions, name, reducer };
