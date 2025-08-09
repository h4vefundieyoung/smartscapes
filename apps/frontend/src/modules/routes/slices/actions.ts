import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import { type RoutesResponseDto } from "~/modules/routes/routes.js";

import { name as sliceName } from "./routes.slice.js";

const getRoute = createAsyncThunk<
	APIResponse<RoutesResponseDto[]>,
	string,
	AsyncThunkConfig
>(`${sliceName}/get-id`, (id, { extra }) => {
	const { routeApi } = extra;

	return routeApi.getRoute(id);
});

export { getRoute };
