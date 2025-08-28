import { createSlice } from "@reduxjs/toolkit";

import { CommonExceptionMessage, DataStatus } from "~/libs/enums/enums.js";
import {
	type RouteGetAllItemResponseDto,
	type ValueOf,
} from "~/libs/types/types.js";

import { getRoutes, loadMoreRoutes } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	error: null | string;
	hasMore: boolean;
	loadMoreDataStatus: ValueOf<typeof DataStatus>;
	page: number;
	routes: RouteGetAllItemResponseDto[];
};

const DEFAULT_PAGE = 1;

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	hasMore: false,
	loadMoreDataStatus: DataStatus.IDLE,
	page: DEFAULT_PAGE,
	routes: [],
};

const { name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder.addCase(getRoutes.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.error = null;
			state.page = DEFAULT_PAGE;
			state.hasMore = true;
		});
		builder.addCase(getRoutes.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.error = null;
			state.routes = action.payload.data;
			const { meta } = action.payload;
			state.hasMore = meta.currentPage < meta.totalPages;
		});
		builder.addCase(getRoutes.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.error =
				action.payload ?? CommonExceptionMessage.COMMON_EXCEPTION_MESSAGE;
			state.routes = [];
			state.hasMore = false;
		});

		builder.addCase(loadMoreRoutes.pending, (state) => {
			state.loadMoreDataStatus = DataStatus.PENDING;
			state.error = null;
		});
		builder.addCase(loadMoreRoutes.fulfilled, (state, action) => {
			state.loadMoreDataStatus = DataStatus.FULFILLED;
			const newRoutes = action.payload.data;

			const existingRouteIds = new Set(state.routes.map((route) => route.id));
			const uniqueNewRoutes = newRoutes.filter(
				(route) => !existingRouteIds.has(route.id),
			);

			state.routes.push(...uniqueNewRoutes);
			const { meta } = action.payload;
			state.page = meta.currentPage;
			state.hasMore = meta.currentPage < meta.totalPages;
		});
		builder.addCase(loadMoreRoutes.rejected, (state) => {
			state.loadMoreDataStatus = DataStatus.REJECTED;
			state.hasMore = false;
		});
	},
	initialState,
	name: "explore",
	reducers: {},
});

export { name, reducer };
