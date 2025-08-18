import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type RouteCreateRequestDto,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";

const create = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	RouteCreateRequestDto,
	AsyncThunkConfig
>(`routes/create`, async (payload, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.create(payload);
});

const getRouteById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`routes/get-route-by-id`, (id, { extra }) => {
	const { routesApi } = extra;

	return routesApi.getRouteById(id);
});

export { create, getRouteById };
