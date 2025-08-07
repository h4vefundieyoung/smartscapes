import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { authPatch, getAuthenticatedUser, signIn, signUp } from "./actions.js";

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
			.addCase(authPatch.fulfilled, (state, action) => {
				state.authenticatedUser = action.payload.data;
				state.dataStatus = DataStatus.FULFILLED;
			})
			.addMatcher(
				isPending(getAuthenticatedUser, signUp, signIn, authPatch),
				(state) => {
					state.dataStatus = DataStatus.PENDING;
				},
			)
			.addMatcher(
				isRejected(getAuthenticatedUser, signUp, signIn, authPatch),
				(state) => {
					state.authenticatedUser = null;
					state.dataStatus = DataStatus.REJECTED;
				},
			);
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
