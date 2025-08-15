import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { create, loadAll } from "./actions.js";

type State = {
	createStatus: ValueOf<typeof DataStatus>;
	data: null | PointsOfInterestResponseDto;
	dataAll: PointsOfInterestResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	createStatus: DataStatus.IDLE,
	data: null,
	dataAll: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, { payload }) => {
			state.data = payload.data;
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});
		builder.addCase(loadAll.fulfilled, (state, { payload }) => {
			state.dataAll = payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
			state.dataAll = [];
		});
	},
	initialState,
	name: "points-of-interest",
	reducers: {},
});

export { actions, name, reducer };
