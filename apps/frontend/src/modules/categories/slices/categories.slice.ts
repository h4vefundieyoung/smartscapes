import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type PaginationMeta, type ValueOf } from "~/libs/types/types.js";

import { type CategoryGetAllItemResponseDto } from "../libs/types/types.js";
import { create, getAll } from "./actions.js";

type State = {
	categories: CategoryGetAllItemResponseDto[];
	createStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	meta: null | PaginationMeta;
};

const initialState: State = {
	categories: [],
	createStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	meta: null,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(create.pending, (state) => {
			state.createStatus = DataStatus.PENDING;
		});
		builder.addCase(create.fulfilled, (state) => {
			state.createStatus = DataStatus.FULFILLED;
		});
		builder.addCase(create.rejected, (state) => {
			state.createStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.categories = action.payload.data;
			state.meta = action.payload.meta;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "categories",
	reducers: {},
});

export { actions, name, reducer };
