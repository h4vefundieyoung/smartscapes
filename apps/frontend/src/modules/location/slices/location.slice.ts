import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type Coordinates } from "../libs/types/types.js";
import { getCurrentUserLocation } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	location: Coordinates | null;
	locationError: null | string;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	location: null,
	locationError: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder.addCase(getCurrentUserLocation.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
			state.locationError = null;
		});
		builder.addCase(getCurrentUserLocation.fulfilled, (state, action) => {
			state.dataStatus = DataStatus.FULFILLED;
			state.location = action.payload;
			state.locationError = null;
		});
		builder.addCase(getCurrentUserLocation.rejected, (state, action) => {
			state.dataStatus = DataStatus.REJECTED;
			state.location = null;
			state.locationError = action.payload ?? "Unknown error occurred.";
		});
	},
	initialState,
	name: "location",
	reducers: {},
});

export { actions, name, reducer };
