import { createSlice } from "@reduxjs/toolkit";

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
	extraReducers(builder) {
		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.data = action.payload.data;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(patchProfile.fulfilled, (state, action) => {
			const updatedUser = action.payload.data;
			const index = state.data.findIndex((user) => user.id === updatedUser.id);
			const isUserExists = index !== INDEX_NOT_FOUND;

			if (isUserExists) {
				state.data[index] = updatedUser;
			} else {
				state.data = [...state.data, updatedUser];
			}

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patchProfile.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(patchProfile.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "users",
	reducers: {},
});

export { actions, name, reducer };
