import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ReviewGetByIdResponseDto } from "../libs/types/types.js";
import { create, getAll } from "./actions.js";

type State = {
	createStatus: ValueOf<typeof DataStatus>;
	data: null | ReviewGetByIdResponseDto;
	fetchStatus: ValueOf<typeof DataStatus>;
	items: ReviewGetByIdResponseDto[];
};

const initialState: State = {
	createStatus: DataStatus.IDLE,
	data: null,
	fetchStatus: DataStatus.IDLE,
	items: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.pending, (state) => {
			state.fetchStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state, { payload }) => {
			state.items = payload.data;
			state.fetchStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.fetchStatus = DataStatus.REJECTED;
		});

		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, { payload }) => {
			state.items.unshift(payload.data);
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "reviews",
	reducers: {},
});

export { actions, name, reducer };
