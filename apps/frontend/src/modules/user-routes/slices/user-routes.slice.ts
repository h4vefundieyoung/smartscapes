import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserRouteResponseDto } from "../libs/types/types.js";
import { getAllByUserId } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	userRoutes: UserRouteResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	userRoutes: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAllByUserId.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllByUserId.fulfilled, (state, action) => {
			state.userRoutes = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllByUserId.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "user-routes",
	reducers: {},
});

export { actions, name, reducer };
