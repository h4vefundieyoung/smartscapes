import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type UserRouteFinishRequestDto,
	type UserRouteQueryRequestDto,
	type UserRouteResponseDto,
} from "../libs/types/types.js";
import { name as detailsSliceName } from "./user-routes-details.slice.js";
import { name as sliceName } from "./user-routes.slice.js";

const create = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	UserRouteQueryRequestDto,
	AsyncThunkConfig
>(`${detailsSliceName}/create`, async ({ routeId }, { extra }) => {
	const { userRoutesApi } = extra;
	const result = await userRoutesApi.create({ routeId });
	toastNotifier.showSuccess("User route created successfully");

	return result;
});

const getAllByUserId = createAsyncThunk<
	APIResponse<UserRouteResponseDto[]>,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-by-user-id`, async (_, { extra }) => {
	const { userRoutesApi } = extra;

	return await userRoutesApi.getAllByUserId();
});

const start = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	UserRouteQueryRequestDto,
	AsyncThunkConfig
>(`${detailsSliceName}/start`, async ({ routeId }, { extra }) => {
	const { userRoutesApi } = extra;
	const result = await userRoutesApi.start({ routeId });
	toastNotifier.showSuccess("User route started successfully");

	return result;
});

const finish = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRouteFinishRequestDto; query: UserRouteQueryRequestDto },
	AsyncThunkConfig
>(`${detailsSliceName}/finish`, async ({ payload, query }, { extra }) => {
	const { userRoutesApi } = extra;
	const result = await userRoutesApi.finish(payload, query);
	toastNotifier.showSuccess("User route finished successfully");

	return result;
});

const saveUserRoute = createAsyncThunk<
	UserRouteResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/save-user-route`, async (routeId, { extra }) => {
	const { userRoutesApi } = extra;
	const { data } = await userRoutesApi.saveRoute(routeId);

	return data;
});

const deleteUserRoute = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/delete-user-route`,
	async (id, { extra }) => {
		const { userRoutesApi } = extra;
		const { data } = await userRoutesApi.deleteRoute(id);

		return data;
	},
);

export {
	create,
	deleteUserRoute,
	finish,
	getAllByUserId,
	saveUserRoute,
	start,
};
