import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PointsOfInterestGetAllItemResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { type PlannedPathResponseDto } from "../libs/types/types.js";
import { constructRoute, findPointsOfInterest } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	pointsOfInterest: PointsOfInterestGetAllItemResponseDto[];
	routeLineString: null | PlannedPathResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	pointsOfInterest: [],
	routeLineString: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(constructRoute.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(constructRoute.fulfilled, (state, action) => {
			state.routeLineString = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(constructRoute.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(findPointsOfInterest.fulfilled, (state, action) => {
			state.pointsOfInterest = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(findPointsOfInterest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(findPointsOfInterest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.pointsOfInterest = [];
		});
	},
	initialState,
	name: "construct-route",
	reducers: {},
});

export { actions, name, reducer };
