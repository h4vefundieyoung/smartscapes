import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type UserRouteResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./user-routes.slice.js";

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

export { deleteUserRoute, saveUserRoute };
