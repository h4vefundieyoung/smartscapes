import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type ReviewGetByIdResponseDto } from "../libs/types/types.js";
import { create, getAll } from "./actions.js";

type State = {
	data: null | ReviewGetByIdResponseDto;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	data: null,
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(create.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state, { payload }) => {
			state.data = payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "reviews",
	reducers: {},
});

export { actions, name, reducer };
