import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type PointsOfInterestResponseDto } from "../libs/types/types.js";
import { findAll } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	pointsOfInterest: PointsOfInterestResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	pointsOfInterest: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(findAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(findAll.fulfilled, (state, action) => {
			state.pointsOfInterest = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(findAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "points-of-interest",
	reducers: {},
});

export { actions, name, reducer };
