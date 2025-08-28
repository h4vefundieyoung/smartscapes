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
	isLoadingMore: boolean;
	loadMoreFailed: boolean;
	page: number;
	routes: RouteGetAllItemResponseDto[];
	searchTerm: string;
};

const DEFAULT_PAGE = 1;

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	error: null,
	hasMore: false,
	isLoadingMore: false,
	loadMoreFailed: false,
	page: DEFAULT_PAGE,
	routes: [],
	searchTerm: "",
};

const { actions, name, reducer } = createSlice({
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
			state.isLoadingMore = true;
			state.loadMoreFailed = false;
			state.error = null;
		});
		builder.addCase(loadMoreRoutes.fulfilled, (state, action) => {
			state.isLoadingMore = false;
			state.loadMoreFailed = false;
			const newRoutes = action.payload.data;
			state.routes.push(...newRoutes);
			const { meta } = action.payload;
			state.page = meta.currentPage;
			state.hasMore = meta.currentPage < meta.totalPages;
		});
		builder.addCase(loadMoreRoutes.rejected, (state) => {
			state.isLoadingMore = false;
			state.loadMoreFailed = true;
			state.hasMore = false;
		});
	},
	initialState,
	name: "explore",
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		resetPagination: (state) => {
			state.page = DEFAULT_PAGE;
			state.hasMore = true;
			state.error = null;
		},
		setSearchTerm: (state, action: { payload: string }) => {
			state.searchTerm = action.payload;
		},
	},
});

export { actions, name, reducer };
