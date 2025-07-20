import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type AsyncThunkConfig,
	type ServerResponse,
} from "~/libs/types/types.js";
import { type UserGetAllItemResponseDto } from "~/modules/users/users.js";

import { name as sliceName } from "./users.slice.js";

const loadAll = createAsyncThunk<
	ServerResponse<UserGetAllItemResponseDto[]>,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
	const { userApi } = extra;

	return userApi.getAll();
});

export { loadAll };
