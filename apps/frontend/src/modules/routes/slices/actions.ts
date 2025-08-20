import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type RouteCreateRequestDto,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./routes.slice.js";

const create = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	RouteCreateRequestDto,
	AsyncThunkConfig
>("routes/create", async (payload, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.create(payload);
});

const getRouteById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>("routes/get-route-by-id", (id, { extra }) => {
	const { routesApi } = extra;

	return routesApi.getRouteById(id);
});

const getAll = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto[]>,
	RouteFindAllOptions | undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (options, { extra }) => {
	const { routesApi } = extra;

	return await routesApi.getAll(options);
});

const preserveFormData = createAsyncThunk<unknown, unknown, AsyncThunkConfig>(
	"routes/preserve-form-data",
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

const restoreFormData = createAsyncThunk<
	null | Partial<RouteCreateRequestDto>,
	unknown,
	AsyncThunkConfig
>("routes/restore-form-data", async (_, { extra }) => {
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

const discardFormData = createAsyncThunk<unknown, unknown, AsyncThunkConfig>(
	"routes/discard-form-data",
	async (_, { extra }) => {
		const { storage } = extra;
		await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
	},
);

const updateFormData = createAction<Partial<RouteCreateRequestDto>>(
	`${sliceName}/update-form-data`,
);

export {
	create,
	discardFormData,
	getAll,
	getRouteById,
	preserveFormData,
	restoreFormData,
	updateFormData,
};
