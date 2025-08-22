import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import {
	type APIResponse,
	type AsyncThunkConfig,
	type FileUploadResponseDto,
} from "~/libs/types/types.js";

import { RouteNotification } from "../libs/enums/enums.js";
import {
	type PatchActionPayload,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./route.slice.js";

const getRouteById = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-route-by-id`, (id, { extra }) => {
	const { routeApi } = extra;

	return routeApi.getRouteById(id);
});

const patchRoute = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto>,
	PatchActionPayload,
	AsyncThunkConfig
>(`${sliceName}/patch-route`, async (payload, { extra }) => {
	const { routeApi } = extra;
	const patchResult = await routeApi.patchRoute(payload);
	toastNotifier.showSuccess(RouteNotification.UPDATED);

	return patchResult;
});

const getAll = createAsyncThunk<
	APIResponse<RouteGetByIdResponseDto[]>,
	RouteFindAllOptions | undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all`, async (options, { extra }) => {
	const { routeApi } = extra;

	return await routeApi.getAll(options);
});

const uploadImage = createAsyncThunk<
	APIResponse<FileUploadResponseDto>,
	File,
	AsyncThunkConfig
>(`${sliceName}/upload-image`, async (payload, { extra, getState }) => {
	const { routeApi, toastNotifier } = extra;

	const state = getState();

	const routeId = state.route.route?.id as number;

	const image = await routeApi.uploadImage({ file: payload, id: routeId });

	toastNotifier.showSuccess("Image was uploaded");

	return image;
});

export { getAll, getRouteById, patchRoute, uploadImage };
