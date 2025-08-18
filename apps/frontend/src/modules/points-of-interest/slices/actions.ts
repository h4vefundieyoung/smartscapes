import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type PointsOfInterestRequestDto,
	type PointsOfInterestResponseDto,
	type PointsOfInterestSearchQuery,
} from "~/modules/points-of-interest/points-of-interest.js";

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

const loadAll = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto[]>,
	PointsOfInterestSearchQuery,
	AsyncThunkConfig
>(`${poiSliceName}/load-all`, async (query, { extra }) => {
	const { pointOfInterestApi } = extra;

	return await pointOfInterestApi.getAll(query);
});

export { create, getById, loadAll };
