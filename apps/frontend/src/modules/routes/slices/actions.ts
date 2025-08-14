import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type RoutesRequestCreateDto,
	type RoutesResponseDto,
} from "@smartscapes/shared";

const create = createAsyncThunk<
	APIResponse<RoutesResponseDto>,
	RoutesRequestCreateDto,
	AsyncThunkConfig
>(`routes/create`, async (payload, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.create(payload);
});

export { create };
