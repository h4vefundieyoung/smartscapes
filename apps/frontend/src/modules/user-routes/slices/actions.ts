import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type UserRouteFinishRequestDto,
	type UserRouteQueryRequestDto,
	type UserRouteResponseDto,
} from "../libs/types/types.js";
import { name as detailsSliceName } from "./user-route-details.slice.js";
import { name as sliceName } from "./user-routes.slice.js";

const create = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	UserRouteQueryRequestDto,
	AsyncThunkConfig
>(`${detailsSliceName}/create`, async ({ routeId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.create({ routeId });
	toastNotifier.showSuccess("User route created successfully");

	return result;
});

const getAllByUserId = createAsyncThunk<
	APIResponse<UserRouteResponseDto[]>,
	UserRouteQueryRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-by-user-id`, async ({ routeId }, { extra }) => {
	const { userRouteApi } = extra;

	return await userRouteApi.getAllByUserId({ routeId });
});

const start = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	UserRouteQueryRequestDto,
	AsyncThunkConfig
>(`${detailsSliceName}/start`, async ({ routeId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.start({ routeId });
	toastNotifier.showSuccess("User route started successfully");

	return result;
});

const finish = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRouteFinishRequestDto; query: UserRouteQueryRequestDto },
	AsyncThunkConfig
>(`${detailsSliceName}/finish`, async ({ payload, query }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.finish(payload, query);
	toastNotifier.showSuccess("User route finished successfully");

	return result;
});

const getByRouteId = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	UserRouteQueryRequestDto,
	AsyncThunkConfig
>(
	`${detailsSliceName}/get-by-route-id-and-user-id`,
	async ({ routeId }, { extra }) => {
		const { userRouteApi } = extra;

		return await userRouteApi.getByRouteId({ routeId });
	},
);

const saveUserRoute = createAsyncThunk<
	UserRouteResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/save-user-route`, async (routeId, { extra }) => {
	const { userRouteApi } = extra;
	const { data } = await userRouteApi.saveRoute(routeId);

	return data;
});

const deleteUserRoute = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/delete-user-route`,
	async (id, { extra }) => {
		const { userRouteApi } = extra;
		const { data } = await userRouteApi.deleteRoute(id);

		return data;
	},
);

export {
	create,
	deleteUserRoute,
	finish,
	getAllByUserId,
	getByRouteId,
	saveUserRoute,
	start,
};
