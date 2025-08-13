import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import { type RoutesResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./routes.slice.js";

const findByPoint = createAsyncThunk<
	APIResponse<RoutesResponseDto[]>,
	number,
	AsyncThunkConfig
>(`${sliceName}/find-by-point`, async (poiId, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.findByPoint(poiId);
});

export { findByPoint };
