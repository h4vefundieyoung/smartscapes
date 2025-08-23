import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserRouteResponseDto } from "../libs/types/types.js";
import { create, finish, getAllByUserId, start } from "./actions.js";

type State = {
	createStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	finishStatus: ValueOf<typeof DataStatus>;
	startStatus: ValueOf<typeof DataStatus>;
	userRoutes: UserRouteResponseDto[];
};

const initialState: State = {
	createStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	finishStatus: DataStatus.IDLE,
	startStatus: DataStatus.IDLE,
	userRoutes: [],
};

const NOT_FOUND_INDEX = -1;

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, action) => {
			state.userRoutes.push(action.payload.data);
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});

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

		builder.addCase(start.pending, (state) => {
			state.startStatus = DataStatus.PENDING;
		});
		builder.addCase(start.fulfilled, (state, action) => {
			const index = state.userRoutes.findIndex(
				(route) => route.id === action.payload.data.id,
			);

			if (index !== NOT_FOUND_INDEX) {
				state.userRoutes[index] = action.payload.data;
			}

			state.startStatus = DataStatus.FULFILLED;
		});
		builder.addCase(start.rejected, (state) => {
			state.startStatus = DataStatus.REJECTED;
		});

		builder.addCase(finish.pending, (state) => {
			state.finishStatus = DataStatus.PENDING;
		});
		builder.addCase(finish.fulfilled, (state, action) => {
			const index = state.userRoutes.findIndex(
				(route) => route.id === action.payload.data.id,
			);

			if (index !== NOT_FOUND_INDEX) {
				state.userRoutes[index] = action.payload.data;
			}

			state.finishStatus = DataStatus.FULFILLED;
		});
		builder.addCase(finish.rejected, (state) => {
			state.finishStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "userRoute",
	reducers: {},
});

export { actions, name, reducer };
