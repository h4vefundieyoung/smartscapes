import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type APIResponse,
	type AsyncThunkConfig,
	type PaginationMeta,
} from "~/libs/types/types.js";
import {
	type PointsOfInterestCreateRequestDto,
	type PointsOfInterestGetAllItemResponseDto,
	type PointsOfInterestGetAllQuery,
	type PointsOfInterestGetByIdResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { name as poiDetailsSliceName } from "./points-of-interest-details.slice.js";
import { name as poiSliceName } from "./points-of-interest.slice.js";

const getById = createAsyncThunk<
	APIResponse<PointsOfInterestGetByIdResponseDto>,
	number,
	AsyncThunkConfig
>(`${poiDetailsSliceName}/load-by-id`, (id, { extra }) => {
	const { pointOfInterestApi } = extra;

	return pointOfInterestApi.getById(id);
});

const create = createAsyncThunk<
	APIResponse<PointsOfInterestGetByIdResponseDto>,
	PointsOfInterestCreateRequestDto,
	AsyncThunkConfig
>(`${poiSliceName}/create`, async (payload, { extra }) => {
	const { pointOfInterestApi, toastNotifier } = extra;

	const pointOfInterest = await pointOfInterestApi.create(payload);
	toastNotifier.showSuccess("Point of interest created successfully");

	return pointOfInterest;
});

const findAll = createAsyncThunk<
	APIResponse<PointsOfInterestGetAllItemResponseDto[], PaginationMeta>,
	PointsOfInterestGetAllQuery,
	AsyncThunkConfig
>(`${poiSliceName}/find-all`, async (payload, { extra }) => {
	const { pointOfInterestApi } = extra;

	const { data, meta } = await pointOfInterestApi.findAll(payload);

	return { data, meta };
});

export { create, findAll, getById };
