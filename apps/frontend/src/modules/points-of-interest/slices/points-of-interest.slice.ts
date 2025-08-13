import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import {
	type PointsOfInterestPaginatedSummary,
	type PointsOfInterestPaginationMeta,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { create, findPaginated } from "./actions.js";

type State = {
	data: PointsOfInterestResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	meta: PointsOfInterestPaginationMeta;
	summary: PointsOfInterestPaginatedSummary[];
};

const initialState: State = {
	data: [],
	dataStatus: DataStatus.IDLE,
	meta: {
		currentPage: 1,
		itemsPerPage: 10,
		total: 0,
		totalPages: 0,
	},
	summary: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.data = Array.isArray(action.payload.data)
				? action.payload.data
				: [action.payload.data];
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(findPaginated.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(findPaginated.fulfilled, (state, action) => {
			const { payload } = action;

			state.summary = payload.data.data.map((item) => ({
				...item,
				createdAt: item.createdAt.split("T")[0] as string,
			}));
			state.meta = payload.data.meta;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(findPaginated.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "points-of-interest",
	reducers: {},
});

export { actions, name, reducer };
