import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/users/users.js";

import {
	type GroupResponseDto,
	type PermissionItemDto,
} from "../libs/types/types.js";
import {
	getAuthenticatedUser,
	logout,
	patchAuthenticatedUser,
	signIn,
	signUp,
} from "./actions.js";

type State = {
	authenticatedUser: null | UserAuthResponseDto;
	authenticatedUserPatchStatus: ValueOf<typeof DataStatus>;
	dataStatus: ValueOf<typeof DataStatus>;
	isInitialized: boolean;
	userGroup: GroupResponseDto | null;
	userPermissions: PermissionItemDto[];
};

const initialState: State = {
	authenticatedUser: null,
	authenticatedUserPatchStatus: DataStatus.IDLE,
	dataStatus: DataStatus.IDLE,
	isInitialized: false,
	userGroup: null,
	userPermissions: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getAuthenticatedUser.fulfilled, (state, action) => {
			const user = action.payload?.data ?? null;
			const group = user?.group ?? null;
			const permissions = group?.permissions ?? [];
			state.authenticatedUser = user;
			state.dataStatus = DataStatus.FULFILLED;
			state.isInitialized = true;
			state.userGroup = group;
			state.userPermissions = permissions;
		});
		builder.addCase(getAuthenticatedUser.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAuthenticatedUser.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
			state.isInitialized = true;
			state.userGroup = null;
			state.userPermissions = [];
		});

		builder.addCase(logout.fulfilled, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.FULFILLED;
			state.userGroup = null;
			state.userPermissions = [];
		});

		builder.addCase(signUp.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload.data.user;
			state.dataStatus = DataStatus.FULFILLED;
			state.userGroup = action.payload.data.user.group;
			state.userPermissions = action.payload.data.user.group.permissions;
		});
		builder.addCase(signUp.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signUp.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
			state.userGroup = null;
			state.userPermissions = [];
		});

		builder.addCase(signIn.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload.data.user;
			state.dataStatus = DataStatus.FULFILLED;
			state.userGroup = action.payload.data.user.group;
			state.userPermissions = action.payload.data.user.group.permissions;
		});
		builder.addCase(signIn.rejected, (state) => {
			state.authenticatedUser = null;
			state.dataStatus = DataStatus.REJECTED;
			state.userGroup = null;
			state.userPermissions = [];
		});

		builder.addCase(patchAuthenticatedUser.fulfilled, (state, action) => {
			state.authenticatedUser = action.payload.data as UserAuthResponseDto;
			state.authenticatedUserPatchStatus = DataStatus.FULFILLED;
		});
		builder.addCase(patchAuthenticatedUser.pending, (state) => {
			state.authenticatedUserPatchStatus = DataStatus.PENDING;
		});
		builder.addCase(patchAuthenticatedUser.rejected, (state) => {
			state.authenticatedUser = null;
			state.authenticatedUserPatchStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "auth",
	reducers: {},
});

export { actions, name, reducer };
