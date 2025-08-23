import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastNotifier } from "~/libs/modules/toast-notifier/toast-notifier.js";
import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type PatchActionPayload,
	type PointsOfInterestPaginatedResponseDto,
	type PointsOfInterestQueryRequest,
	type PointsOfInterestRequestDto,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { PointOfInterestNotification } from "../libs/enums/enums.js";
import { name as poiDetailsSliceName } from "./points-of-interest-details.slice.js";
import { name as poiSliceName } from "./points-of-interest.slice.js";

const getById = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto>,
	number,
	AsyncThunkConfig
>(`${poiDetailsSliceName}/load-by-id`, (id, { extra }) => {
	const { pointOfInterestApi } = extra;

	return pointOfInterestApi.getById(id);
});

const create = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto>,
	PointsOfInterestRequestDto,
	AsyncThunkConfig
>(`${poiSliceName}/create`, async (payload, { extra }) => {
	const { pointOfInterestApi, toastNotifier } = extra;

	const pointOfInterest = await pointOfInterestApi.create(payload);
	toastNotifier.showSuccess("Point of interest created successfully");

	return pointOfInterest;
});

const findPaginated = createAsyncThunk<
	APIResponse<PointsOfInterestPaginatedResponseDto>,
	PointsOfInterestQueryRequest,
	AsyncThunkConfig
>(`${poiSliceName}/find-paginated-items`, async (payload, { extra }) => {
	const { pointOfInterestApi } = extra;

	const pointsOfInterest = await pointOfInterestApi.findPaginated(payload);

	return pointsOfInterest;
});

const patchPointOfInterest = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto>,
	PatchActionPayload,
	AsyncThunkConfig
>(`${poiSliceName}/patch-point-of-interest`, async (payload, { extra }) => {
	const { pointOfInterestApi } = extra;
	const patchResult = await pointOfInterestApi.patchPointOfInterest(payload);
	toastNotifier.showSuccess(PointOfInterestNotification.UPDATED);

	return patchResult;
});

export { create, findPaginated, getById, patchPointOfInterest };
