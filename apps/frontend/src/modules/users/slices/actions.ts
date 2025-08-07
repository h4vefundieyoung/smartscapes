import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type UserGetByIdItemResponseDto,
	type UserAuthPatchRequestDto,
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

const patchProfile = createAsyncThunk<
	APIResponse<UserGetByIdItemResponseDto>,
	{ id: string; payload: UserAuthPatchRequestDto },
	AsyncThunkConfig
>(`${sliceName}/patch`, async ({ id, payload }, { extra }) => {
	const { userApi } = extra;

	return await userApi.patch(id, payload);
});

export { loadAll, patchProfile };
