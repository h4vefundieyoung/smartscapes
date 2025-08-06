import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserGetByIdItemResponseDto } from "~/modules/users/users.js";

import { loadAll, patchProfile } from "./actions.js";

type State = {
	data: UserGetByIdItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	data: [],
	dataStatus: DataStatus.IDLE,
};

const INDEX_NOT_FOUND = -1;

const { actions, name, reducer } = createSlice({
	extraReducers: (builder) => {
		builder
			.addCase(loadAll.fulfilled, (state, action) => {
				state.data = action.payload.data;
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(patchProfile.fulfilled, (state, action) => {
				const updated = action.payload.data;
				const index = state.data.findIndex((u) => u.id === updated.id);

				if (index === INDEX_NOT_FOUND) {
					state.data.push(updated);
				} else {
					state.data[index] = updated;
				}

				state.dataStatus = DataStatus.FULFILLED;
			})
			.addMatcher(isPending(loadAll, patchProfile), (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addMatcher(isRejected(loadAll, patchProfile), (state) => {
				state.dataStatus = DataStatus.REJECTED;
				state.data = [];
			});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
