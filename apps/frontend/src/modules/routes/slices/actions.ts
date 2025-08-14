import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type RoutesFindAllOptions,
	type RoutesResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./routes.slice.js";

const findAll = createAsyncThunk<
	APIResponse<RoutesResponseDto[]>,
	RoutesFindAllOptions | undefined,
	AsyncThunkConfig
>(`${sliceName}/find-all`, async (options, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.findAll(options);
});

export { findAll };
