import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type RouteCreateRequestDto,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";

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

const preserveCreateRouteData = createAsyncThunk<
	unknown,
	Partial<RouteCreateRequestDto>,
	AsyncThunkConfig
>("routes/preserve-create-route-data", async (payload, { extra }) => {
	const { storage } = extra;

	await storage.set(StorageKey.CREATE_ROUTE_FORM_DATA, JSON.stringify(payload));
});

const restoreCreateRouteData = createAsyncThunk<
	null | Partial<RouteCreateRequestDto>,
	unknown,
	AsyncThunkConfig
>("routes/restore-create-route-data", async (_, { extra }) => {
	const { storage } = extra;

	const savedData = await storage.get(StorageKey.CREATE_ROUTE_FORM_DATA);

	if (savedData && typeof savedData === "string") {
		try {
			return JSON.parse(savedData) as Partial<RouteCreateRequestDto>;
		} catch {
			await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);

			return null;
		}
	}

	return null;
});

const discardCreateRouteData = createAsyncThunk<
	unknown,
	unknown,
	AsyncThunkConfig
>("routes/discard-create-route-data", async (_, { extra }) => {
	const { storage } = extra;

	await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
});

export {
	create,
	discardCreateRouteData,
	getRouteById,
	preserveCreateRouteData,
	restoreCreateRouteData,
};
