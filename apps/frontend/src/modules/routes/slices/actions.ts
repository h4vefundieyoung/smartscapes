import { createAsyncThunk } from "@reduxjs/toolkit";
import { type PointsOfInterestGetAllQuery } from "@smartscapes/shared";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import {
	type APIResponse,
	type AsyncThunkConfig,
	type PaginationMeta,
} from "~/libs/types/types.js";
import { type PointsOfInterestGetAllItemResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { RouteNotification } from "../libs/enums/enums.js";
import {
	type PatchActionPayload,
	type PlannedPathResponseDto,
	type RouteConstructRequestDto,
	type RouteCreateRequestDto,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";
import { name as constructRouteSliceName } from "./construct-route.slice.js";
import { name as routeDetailsSliceName } from "./route-details.slice.js";
import { name as routesSliceName } from "./routes.slice.js";

const create = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	RouteCreateRequestDto,
	AsyncThunkConfig
>(`${routesSliceName}/create`, async (payload, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.create(payload);
});

const getById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`${routeDetailsSliceName}/get-by-id`, (id, { extra }) => {
	const { routesApi } = extra;

	return routesApi.getById(id);
});

const patch = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	PatchActionPayload,
	AsyncThunkConfig
>(`${routeDetailsSliceName}/patch`, async (payload, { extra }) => {
	const { routesApi } = extra;
	const patchResult = await routesApi.patch(payload);
	toastNotifier.showSuccess(RouteNotification.UPDATED);

	return patchResult;
});

const getAll = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto[]>,
	RouteFindAllOptions | undefined,
	AsyncThunkConfig
>(`${routesSliceName}/get-all`, async (options, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.getAll(options);
});

const preserveCreateRouteFormData = createAsyncThunk<
	unknown,
	Partial<RouteCreateRequestDto>,
	AsyncThunkConfig
>(
	`${routesSliceName}/preserve-create-route-form-data`,
	async (formData, { extra }) => {
		const { storage } = extra;

		if (Object.keys(formData).length > 0) {
			await storage.set(
				StorageKey.CREATE_ROUTE_FORM_DATA,
				JSON.stringify(formData),
			);
		}
	},
);

const restoreCreateRouteFormData = createAsyncThunk<
	null | Partial<RouteCreateRequestDto>,
	unknown,
	AsyncThunkConfig
>(`${routesSliceName}/restore-create-route-form-data`, async (_, { extra }) => {
	const { storage } = extra;

	const savedData = await storage.get<string>(
		StorageKey.CREATE_ROUTE_FORM_DATA,
	);

	if (savedData) {
		try {
			return JSON.parse(savedData) as Partial<RouteCreateRequestDto>;
		} catch {
			await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);

			return null;
		}
	}

	return null;
});

const findPointsOfInterest = createAsyncThunk<
	APIResponse<PointsOfInterestGetAllItemResponseDto[], PaginationMeta>,
	PointsOfInterestGetAllQuery,
	AsyncThunkConfig
>(`${constructRouteSliceName}/load-all`, async (query, { extra }) => {
	const { pointOfInterestApi } = extra;

	return await pointOfInterestApi.findAll(query);
});

const constructRoute = createAsyncThunk<
	APIResponse<PlannedPathResponseDto>,
	RouteConstructRequestDto,
	AsyncThunkConfig
>(`${constructRouteSliceName}/construct-route`, async (payload, { extra }) => {
	const { routesApi, toastNotifier } = extra;

	const response = await routesApi.construct(payload);

	toastNotifier.showSuccess("Route constructed successfully");

	return response;
});

const discardCreateRouteFormData = createAsyncThunk<
	unknown,
	unknown,
	AsyncThunkConfig
>(`${routesSliceName}/discard-create-route-form-data`, async (_, { extra }) => {
	const { storage } = extra;
	await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
});

export {
	constructRoute,
	create,
	discardCreateRouteFormData,
	findPointsOfInterest,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
};
