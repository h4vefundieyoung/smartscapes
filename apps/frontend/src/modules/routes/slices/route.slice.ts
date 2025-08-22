import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { getAll, getRouteById, patchRoute, uploadImage } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	route: null | RouteGetByIdResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	route: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
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
		builder.addCase(patchRoute.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(uploadImage.fulfilled, (state, action) => {
			if (state.route) {
				state.route = {
					...state.route,
					imagesUrl: [
						...(state.route.imagesUrl ?? []),
						action.payload.data.url,
					],
				};
			}

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patchRoute.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patchRoute.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
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
	},
	initialState,
	name: "route",
	reducers: {},
});

export { actions, name, reducer };
