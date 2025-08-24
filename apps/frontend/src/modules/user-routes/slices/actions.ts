import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type UserRouteCreateRequestDto,
	type UserRoutePatchRequestDto,
	type UserRouteResponseDto,
} from "../libs/types/types.js";
import { name as detailsSliceName } from "./user-route-details.slice.js";
import { name as sliceName } from "./user-route.slice.js";

const create = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRouteCreateRequestDto; userId: number },
	AsyncThunkConfig
>(`${detailsSliceName}/create`, async ({ payload, userId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.create(userId, payload);
	toastNotifier.showSuccess("User route created successfully");

	return result;
});

const getAllByUserId = createAsyncThunk<
	APIResponse<UserRouteResponseDto[]>,
	number,
	AsyncThunkConfig
>(`${sliceName}/get-by-user-id`, async (userId, { extra }) => {
	const { userRouteApi } = extra;

	return await userRouteApi.getByUserId(userId);
});

const start = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRouteCreateRequestDto; userId: number },
	AsyncThunkConfig
>(`${detailsSliceName}/start`, async ({ payload, userId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.start(userId, payload);
	toastNotifier.showSuccess("User route started successfully");

	return result;
});

const finish = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRoutePatchRequestDto; userId: number },
	AsyncThunkConfig
>(`${detailsSliceName}/finish`, async ({ payload, userId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.finish(userId, payload);
	toastNotifier.showSuccess("User route finished successfully");

	return result;
});

const getByRouteIdAndUserId = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRouteCreateRequestDto; userId: number },
	AsyncThunkConfig
>(
	`${detailsSliceName}/get-by-route-id-and-user-id`,
	async ({ payload, userId }, { extra }) => {
		const { userRouteApi } = extra;

		return await userRouteApi.getByRouteIdAndUserId(userId, payload);
	},
);

export { create, finish, getAllByUserId, getByRouteIdAndUserId, start };
