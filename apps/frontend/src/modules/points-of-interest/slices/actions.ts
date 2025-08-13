import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type PointsOfInterestResponseDto,
	type PointsOfInterestSearchQuery,
} from "../libs/types/types.js";
import { name as sliceName } from "./points-of-interest.slice.js";

const findAll = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto[]>,
	PointsOfInterestSearchQuery | undefined,
	AsyncThunkConfig
>(`${sliceName}/findAll`, async (query, { extra }) => {
	const { pointsOfInterestApi } = extra;

	return await pointsOfInterestApi.findAll(query);
});

export { findAll };
