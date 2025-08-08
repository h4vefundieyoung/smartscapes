import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import { authPatch, getAuthenticatedUser, signIn, signUp } from "./actions.js";

type State = {
	authenticatedUser: null | UserAuthResponseDto;
	dataPatchStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	isInitialized: boolean;
};

const initialState: State = {
	authenticatedUser: null,
	dataPatchStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	isInitialized: false,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload ? action.payload.data : null;
			state.dataStatus = DataStatus.FULFILLED;
			state.isInitialized = true;
		});
		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
			state.isInitialized = true;
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

		builder.addCase(authPatch.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload.data;
			state.dataPatchStatus = DataStatus.FULFILLED;
		});
		builder.addCase(authPatch.pending, (state) => {
			state.dataPatchStatus = DataStatus.PENDING;
		});
		builder.addCase(authPatch.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataPatchStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
