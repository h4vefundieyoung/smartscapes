import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserRouteResponseDto } from "../libs/types/types.js";
import { create, finish, getByRouteId, start } from "./actions.js";

type State = {
	createStatus: ValueOf<typeof DataStatus>;
	finishStatus: ValueOf<typeof DataStatus>;
	startStatus: ValueOf<typeof DataStatus>;
	userRouteDetails: null | UserRouteResponseDto;
	userRouteDetailsDataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	createStatus: DataStatus.IDLE,
	finishStatus: DataStatus.IDLE,
	startStatus: DataStatus.IDLE,
	userRouteDetails: null,
	userRouteDetailsDataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.userRouteDetails = action.payload.data;
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});

		builder.addCase(start.pending, (state) => {
			state.startStatus = DataStatus.PENDING;
			state.createStatus = DataStatus.IDLE;
		});
		builder.addCase(start.fulfilled, (state, action) => {
			state.userRouteDetails = action.payload.data;
			state.startStatus = DataStatus.FULFILLED;
		});
		builder.addCase(start.rejected, (state) => {
			state.startStatus = DataStatus.REJECTED;
		});

		builder.addCase(finish.pending, (state) => {
			state.finishStatus = DataStatus.PENDING;
		});
		builder.addCase(finish.fulfilled, (state, action) => {
			state.userRouteDetails = action.payload.data;
			state.finishStatus = DataStatus.FULFILLED;
		});
		builder.addCase(finish.rejected, (state) => {
			state.finishStatus = DataStatus.REJECTED;
		});

		builder.addCase(getByRouteId.fulfilled, (state, action) => {
			state.userRouteDetailsDataStatus = DataStatus.FULFILLED;
			state.userRouteDetails = action.payload.data;
		});
		builder.addCase(getByRouteId.pending, (state) => {
			state.userRouteDetailsDataStatus = DataStatus.PENDING;
		});
		builder.addCase(getByRouteId.rejected, (state) => {
			state.userRouteDetailsDataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-route-details",
	reducers: {},
});

export { actions, name, reducer };
