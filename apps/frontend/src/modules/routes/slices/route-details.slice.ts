import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { deleteImage, getById, patch, uploadImage } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	patchStatus: ValueOf<typeof DataStatus>;
	route: null | RouteGetByIdResponseDto;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	patchStatus: DataStatus.IDLE,
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
			state.patchStatus = DataStatus.PENDING;
		});
		builder.addCase(patch.fulfilled, (state, action) => {
			state.route = action.payload.data;
			state.patchStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patch.rejected, (state) => {
			state.patchStatus = DataStatus.REJECTED;
		});

		builder.addCase(deleteImage.fulfilled, (state, action) => {
			if (state.route) {
				state.route.images = state.route.images.filter(
					(image) => image.id !== action.payload.data.id,
				);
			}

			state.dataStatus = DataStatus.FULFILLED;
		});

		builder.addCase(uploadImage.fulfilled, (state, action) => {
			if (state.route) {
				state.route.images.push({
					id: action.payload.data.id,
					url: action.payload.data.url,
				});
			}

			state.dataStatus = DataStatus.FULFILLED;
		});
	},
	initialState,
	name: "route-details",
	reducers: {},
});

export { actions, name, reducer };
