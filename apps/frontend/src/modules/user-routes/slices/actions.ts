import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type UserRouteCreateRequestDto,
	type UserRoutePatchRequestDto,
	type UserRouteResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./user-route.slice.js";

const create = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRouteCreateRequestDto; userId: number },
	AsyncThunkConfig
>(`${sliceName}/create`, async ({ payload, userId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.create(userId, payload);
	toastNotifier.showSuccess("User route created successfully");

	return result;
});

const getByUserId = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
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
>(`${sliceName}/start`, async ({ payload, userId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.start(userId, payload);
	toastNotifier.showSuccess("User route started successfully");

	return result;
});

const finish = createAsyncThunk<
	APIResponse<UserRouteResponseDto>,
	{ payload: UserRoutePatchRequestDto; userId: number },
	AsyncThunkConfig
>(`${sliceName}/finish`, async ({ payload, userId }, { extra }) => {
	const { userRouteApi } = extra;
	const result = await userRouteApi.finish(userId, payload);
	toastNotifier.showSuccess("User route finished successfully");

	return result;
});

export { create, finish, getByUserId, start };
