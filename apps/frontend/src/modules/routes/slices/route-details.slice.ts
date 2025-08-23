import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ReviewGetByIdResponseDto } from "~/modules/reviews/reviews.js";

import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { createReview, getById, getReviews, patch } from "./actions.js";

type State = {
	createStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	fetchStatus: ValueOf<typeof DataStatus>;
	items: ReviewGetByIdResponseDto[];
	route: null | RouteGetByIdResponseDto;
};

const initialState: State = {
	createStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	fetchStatus: DataStatus.IDLE,
	items: [],
	route: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getById.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(patch.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(getReviews.pending, (state) => {
			state.fetchStatus = DataStatus.PENDING;
		});
		builder.addCase(getReviews.fulfilled, (state, { payload }) => {
			state.items = payload.data;
			state.fetchStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getReviews.rejected, (state) => {
			state.fetchStatus = DataStatus.REJECTED;
		});

		builder.addCase(createReview.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(createReview.fulfilled, (state, { payload }) => {
			state.items.unshift(payload.data);
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createReview.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "route-details",
	reducers: {},
});

export { actions, name, reducer };
