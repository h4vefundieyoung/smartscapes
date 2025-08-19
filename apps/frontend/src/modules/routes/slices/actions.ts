import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type RouteConstructRequestDto,
	type RouteConstructResponseDto,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./route.slice.js";

const construct = createAsyncThunk<
	APIResponse<RouteConstructResponseDto>,
	RouteConstructRequestDto,
	AsyncThunkConfig
>(`${sliceName}/construct-route`, async (payload, { extra }) => {
	const { routeApi, toastNotifier } = extra;

	const response = await routeApi.construct(payload);

	toastNotifier.showSuccess("Route constructed successfully");

	return response;
});

const getRouteById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-route-by-id`, async (id, { extra }) => {
	const { routeApi } = extra;

	return await routeApi.getRouteById(id);
});

const getAll = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto[]>,
	RouteFindAllOptions | undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (options, { extra }) => {
	const { routeApi } = extra;

	return await routeApi.getAll(options);
});

export { construct, getAll, getRouteById };
