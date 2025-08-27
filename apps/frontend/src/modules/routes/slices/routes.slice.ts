import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type PaginationMeta, type ValueOf } from "~/libs/types/types.js";

import {
	type RouteCreateRequestDto,
	type RouteGetAllItemResponseDto,
	type RouteGetByIdResponseDto,
} from "./../libs/types/types.js";
import {
	create,
	discardCreateRouteFormData,
	findAll,
	getAll,
	restoreCreateRouteFormData,
} from "./actions.js";

type State = {
	createRouteFormData: null | Partial<RouteCreateRequestDto>;
	createStatus: ValueOf<typeof DataStatus>;
	data: RouteGetAllItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
	meta: null | PaginationMeta;
	restoreCreateRouteFormStatus: ValueOf<typeof DataStatus>;
	routes: RouteGetByIdResponseDto[];
};

const initialState: State = {
	createRouteFormData: null,
	createStatus: DataStatus.IDLE,
	data: [],
	dataStatus: DataStatus.IDLE,
	meta: null,
	restoreCreateRouteFormStatus: DataStatus.IDLE,
	routes: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.routes.push(action.payload.data);
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(restoreCreateRouteFormData.pending, (state) => {
			state.restoreCreateRouteFormStatus = DataStatus.PENDING;
		});
		builder.addCase(restoreCreateRouteFormData.fulfilled, (state, action) => {
			state.createRouteFormData = action.payload;
			state.restoreCreateRouteFormStatus = DataStatus.FULFILLED;
		});
		builder.addCase(restoreCreateRouteFormData.rejected, (state) => {
			state.restoreCreateRouteFormStatus = DataStatus.REJECTED;
		});

		builder.addCase(discardCreateRouteFormData.fulfilled, (state) => {
			state.createRouteFormData = null;
		});

		builder.addCase(findAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(findAll.fulfilled, (state, action) => {
			const { payload } = action;

			state.data = payload.data;
			state.meta = payload.meta;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(findAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "routes",
	reducers: {
		resetCreateStatus(state) {
			state.createStatus = DataStatus.IDLE;
		},
	},
});

export { actions, name, reducer };
