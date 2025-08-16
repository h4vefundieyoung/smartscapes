import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type PointsOfInterestResponseDto } from "../libs/types/types.js";
import { getById } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	pointsOfInterest: null | PointsOfInterestResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	pointsOfInterest: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.pointsOfInterest = action.payload.data;
		});
		builder.addCase(getById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "points-of-interest",
	reducers: {},
});

export { actions, name, reducer };
