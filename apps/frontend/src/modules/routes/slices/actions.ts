import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type RouteConstructRequestDto,
	type RouteConstructResponseDto,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./route.slice.js";

const construct = createAsyncThunk<
	APIResponse<RouteConstructResponseDto>,
	RouteConstructRequestDto,
	AsyncThunkConfig
>(`${sliceName}/construct-route`, async (payload, { extra }) => {
	const { routeApi } = extra;

	return await routeApi.construct(payload);
});

const getRouteById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-route-by-id`, async (id, { extra }) => {
	const { routeApi } = extra;

	return await routeApi.getRouteById(id);
});

export { construct, getRouteById };
