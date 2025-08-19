import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import { RoutesNotification } from "../libs/enums/enums.js";
import {
	type PatchActionPayload,
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
	toastNotifier.showSuccess(RoutesNotification.UPDATED);

	return patchResult;
});

export { getRouteById, patchRoute };
