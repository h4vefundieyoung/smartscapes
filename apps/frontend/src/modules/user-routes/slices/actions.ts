import { createAsyncThunk } from "@reduxjs/toolkit";
import { type UserRouteStatusType } from "@smartscapes/shared";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import { type UserRouteResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./user-routes.slice.js";

const getAllByUserId = createAsyncThunk<
	APIResponse<UserRouteResponseDto[]>,
	UserRouteStatusType,
	AsyncThunkConfig
>(`${sliceName}/get-by-user-id`, async (status, { extra }) => {
	const { userRoutesApi } = extra;

	return await userRoutesApi.getAllByUserId({ status });
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

export { deleteUserRoute, getAllByUserId, saveUserRoute };
