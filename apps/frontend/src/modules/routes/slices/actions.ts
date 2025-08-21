import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import { RouteNotification } from "../libs/enums/enums.js";
import {
	type PatchActionPayload,
	type RouteCreateRequestDto,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./routes.slice.js";

const create = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	RouteCreateRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.create(payload);
});

const getRouteById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-route-by-id`, (id, { extra }) => {
	const { routesApi } = extra;

	return routesApi.getRouteById(id);
});

const patchRoute = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	PatchActionPayload,
	AsyncThunkConfig
>(`${sliceName}/patch-route`, async (payload, { extra }) => {
	const { routesApi } = extra;
	const patchResult = await routesApi.patchRoute(payload);
	toastNotifier.showSuccess(RouteNotification.UPDATED);

	return patchResult;
});

const getAll = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto[]>,
	RouteFindAllOptions | undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (options, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.getAll(options);
});

const preserveCreateRouteFormData = createAsyncThunk<
	unknown,
	unknown,
	AsyncThunkConfig
>(
	`${sliceName}/preserve-create-route-form-data`,
	async (_, { extra, getState }) => {
		const { storage } = extra;
		const state = getState() as {
			route: { formData: null | Partial<RouteCreateRequestDto> };
		};

		if (state.route.formData && Object.keys(state.route.formData).length > 0) {
			await storage.set(
				StorageKey.CREATE_ROUTE_FORM_DATA,
				JSON.stringify(state.route.formData),
			);
		}
	},
);

const restoreCreateRouteFormData = createAsyncThunk<
	null | Partial<RouteCreateRequestDto>,
	unknown,
	AsyncThunkConfig
>(`${sliceName}/restore-create-route-form-data`, async (_, { extra }) => {
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

const discardCreateRouteFormData = createAsyncThunk<
	unknown,
	unknown,
	AsyncThunkConfig
>(`${sliceName}/discard-create-route-form-data`, async (_, { extra }) => {
	const { storage } = extra;
	await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
});

const updateCreateRouteFormData = createAction<Partial<RouteCreateRequestDto>>(
	`${sliceName}/update-create-route-form-data`,
);

export {
	create,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	patchRoute,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	updateCreateRouteFormData,
};
