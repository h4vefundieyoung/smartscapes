import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type UserGetByIdItemResponseDto,
	type UserProfileRequestDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const loadAll = createAsyncThunk<
	APIResponse<UserGetByIdItemResponseDto[]>,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra }) => {
	const { userApi } = extra;

	return await userApi.getAll();
});

const patch = createAsyncThunk<
	APIResponse<UserGetByIdItemResponseDto>,
	{ id: string; payload: UserProfileRequestDto },
	AsyncThunkConfig
>(
	`${sliceName}/patch`,
	async ({ id, payload }, { dispatch, extra, getState }) => {
		const { userApi } = extra;

		const updatedUser = await userApi.patch(id, payload);

		const state = getState();

		const currentUserId = state.auth.authenticatedUser?.id;

		if (updatedUser.data.id === currentUserId) {
			dispatch(
				authActions.setAuthenticatedUser({
					...state.auth.authenticatedUser,
					...updatedUser.data,
				}),
			);
		}

		return updatedUser;
	},
);

export { loadAll, patch };
