import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	type RouteCreateRequestDto,
	type RouteGetByIdResponseDto,
} from "./../libs/types/types.js";
import {
	create,
	discardCreateRouteData,
	getRouteById,
	restoreCreateRouteData,
} from "./actions.js";

type State = {
	createRouteFormData: null | Partial<RouteCreateRequestDto>;
	createRouteFormDataStatus: ValueOf<typeof DataStatus>;
	createStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	route: null | RouteGetByIdResponseDto;
	routes: RouteGetByIdResponseDto[];
};

const initialState: State = {
	createRouteFormData: null,
	createRouteFormDataStatus: DataStatus.IDLE,
	createStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	route: null,
	routes: [],
};

const { actions, reducer } = createSlice({
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
		builder.addCase(getRouteById.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getRouteById.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getRouteById.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(restoreCreateRouteData.pending, (state) => {
			state.createRouteFormDataStatus = DataStatus.PENDING;
		});
		builder.addCase(restoreCreateRouteData.fulfilled, (state, action) => {
			state.createRouteFormData = action.payload;
			state.createRouteFormDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(restoreCreateRouteData.rejected, (state) => {
			state.createRouteFormDataStatus = DataStatus.REJECTED;
		});
		builder.addCase(discardCreateRouteData.fulfilled, (state) => {
			state.createRouteFormData = null;
		});
	},
	initialState,
	name: "routes",
	reducers: {
		updateCreateRouteFormData: (state, action) => {
			state.createRouteFormData = {
				...state.createRouteFormData,
				...action.payload,
			} as Partial<RouteCreateRequestDto>;
		},
	},
});

export { actions, reducer };
