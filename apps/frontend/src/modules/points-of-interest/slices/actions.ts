import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type PointsOfInterestPaginatedResponseDto,
	type PointsOfInterestQueryRequest,
	type PointsOfInterestRequestDto,
	type PointsOfInterestResponseDto,
	type PointsOfInterestWithRoutesDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { name as poiDetailsSliceName } from "./points-of-interest-details.slice.js";
import { name as poiSliceName } from "./points-of-interest.slice.js";

const getById = createAsyncThunk<
	APIResponse<PointsOfInterestWithRoutesDto>,
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

export { create, findPaginated, getById };
