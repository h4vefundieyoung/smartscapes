import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

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
	extraReducers: (builder) => {
		builder
			.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
				state.authenticatedUser = action.payload ? action.payload.data : null;
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.authenticatedUser = action.payload.data.user;
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.authenticatedUser = action.payload.data.user;
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addCase(patchProfile.fulfilled, (state, action) => {
				state.authenticatedUser = action.payload.data;
			})
			.addMatcher(isPending(getAuthenticatedUser, signUp, signIn), (state) => {
				state.dataStatus = DataStatus.PENDING;
			})
			.addMatcher(isRejected(getAuthenticatedUser, signUp, signIn), (state) => {
				state.authenticatedUser = null;
				state.dataStatus = DataStatus.REJECTED;
			});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
