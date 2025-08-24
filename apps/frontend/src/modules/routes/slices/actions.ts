import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import {
	type APIResponse,
	type AsyncThunkConfig,
	type FileUploadResponseDto,
} from "~/libs/types/types.js";

import { RouteNotification } from "../libs/enums/enums.js";
import {
	type PatchActionPayload,
	type RouteCreateRequestDto,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
	type UploadImageActionPayload,
} from "../libs/types/types.js";
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

const uploadImage = createAsyncThunk<
	APIResponse<FileUploadResponseDto>,
	UploadImageActionPayload,
	AsyncThunkConfig
>(`${routesSliceName}/upload-image`, async (payload, { extra }) => {
	const { routesApi, toastNotifier } = extra;

	const { file, id } = payload;

	const image = await routesApi.uploadImage({ file, id });

	toastNotifier.showSuccess("Image was uploaded");

	return image;
});

const deleteImage = createAsyncThunk<
	APIResponse<{ id: number; isDeleted: boolean }>,
	number,
	AsyncThunkConfig
>(`${routesSliceName}/delete-image`, async (id, { extra }) => {
	const { fileApi, toastNotifier } = extra;

	const response = await fileApi.delete({ id });

	toastNotifier.showSuccess("Image was deleted");

	return {
		data: {
			id,
			isDeleted: response.data,
		},
		error: null,
	};
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

const discardCreateRouteFormData = createAsyncThunk<
	unknown,
	unknown,
	AsyncThunkConfig
>(`${routesSliceName}/discard-create-route-form-data`, async (_, { extra }) => {
	const { storage } = extra;
	await storage.drop(StorageKey.CREATE_ROUTE_FORM_DATA);
});

export {
	create,
	deleteImage,
	discardCreateRouteFormData,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	uploadImage,
};
