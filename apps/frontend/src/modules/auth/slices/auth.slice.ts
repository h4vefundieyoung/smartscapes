import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { patchProfile } from "~/modules/users/slices/actions.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { getAuthenticatedUser, signIn, signUp } from "./actions.js";

type State = {
	authenticatedUser: null | UserAuthResponseDto;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	authenticatedUser: null,
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload ? action.payload.data : null;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(signUp.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload.data.user;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload.data.user;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(patchProfile.fulfilled, (state, action) => {
			if (
				state.authenticatedUser &&
				state.authenticatedUser.id === action.payload.data.id
			) {
				state.authenticatedUser = action.payload.data;
			}
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
