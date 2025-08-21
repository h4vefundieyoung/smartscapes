import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { type PlannedPathResponseDto } from "../libs/types/types.js";
import { construct, getPointsOfInterest } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	pointsOfInterest: PointsOfInterestResponseDto[];
	routeLineString: null | PlannedPathResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	pointsOfInterest: [],
	routeLineString: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(construct.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(construct.fulfilled, (state, action) => {
			state.routeLineString = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(construct.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getPointsOfInterest.fulfilled, (state, action) => {
			state.pointsOfInterest = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getPointsOfInterest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getPointsOfInterest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.pointsOfInterest = [];
		});
	},
	initialState,
	name: "construct-route",
	reducers: {},
});

export { actions, name, reducer };
