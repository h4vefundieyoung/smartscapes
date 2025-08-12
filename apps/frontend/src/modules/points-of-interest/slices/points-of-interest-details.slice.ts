import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { loadById } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	isInitialized: boolean;
	pointsOfInterestDetails: PointsOfInterestResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	isInitialized: false,
	pointsOfInterestDetails: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadById.fulfilled, (state, action) => {
			const incomingPoiDetails = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
			state.pointsOfInterestDetails = [
				...state.pointsOfInterestDetails.filter(
					(poiDetail) => poiDetail.id !== incomingPoiDetails.id,
				),
				incomingPoiDetails,
			];
		});
		builder.addCase(loadById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "Points of interest",
	reducers: {},
});

export { actions, name, reducer };
