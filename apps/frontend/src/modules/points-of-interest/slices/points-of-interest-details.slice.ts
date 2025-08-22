import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PointsOfInterestWithRoutesDto } from "~/modules/points-of-interest/points-of-interest.js";

import { getById } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	pointsOfInterestDetails: null | PointsOfInterestWithRoutesDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	pointsOfInterestDetails: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.pointsOfInterestDetails = action.payload.data;
		});
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "point-of-interest-details",
	reducers: {},
});

export { actions, name, reducer };
