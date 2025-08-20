import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type PointsOfInterestQueryRequest,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import {
	type RouteConstructRequestDto,
	type RouteConstructResponseDto,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";
import { name as constructRouteSliceName } from "./construct-route.slice.js";
import { name as routeSliceName } from "./route.slice.js";

const getRouteById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`${routeSliceName}/get-route-by-id`, async (id, { extra }) => {
	const { routeApi } = extra;

	return await routeApi.getRouteById(id);
});

const getAll = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto[]>,
	RouteFindAllOptions | undefined,
	AsyncThunkConfig
>(`${routeSliceName}/get-all`, async (options, { extra }) => {
	const { routeApi } = extra;

	return await routeApi.getAll(options);
});

const construct = createAsyncThunk<
	APIResponse<RouteConstructResponseDto>,
	RouteConstructRequestDto,
	AsyncThunkConfig
>(`${constructRouteSliceName}/construct-route`, async (payload, { extra }) => {
	const { routeApi, toastNotifier } = extra;

	const response = await routeApi.construct(payload);

	toastNotifier.showSuccess("Route constructed successfully");

	return response;
});

const getPointsOfInterest = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto[]>,
	PointsOfInterestQueryRequest,
	AsyncThunkConfig
>(`${constructRouteSliceName}/load-all`, async (query, { extra }) => {
	const { pointOfInterestApi } = extra;

	return await pointOfInterestApi.getAll(query);
});

export { construct, getAll, getPointsOfInterest, getRouteById };
