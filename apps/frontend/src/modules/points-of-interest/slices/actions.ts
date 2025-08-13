import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type PointsOfInterestResponseDto,
	type PointsOfInterestSearchQuery,
} from "~/modules/points-of-interest/points-of-interest.js";

import { name as sliceName } from "./points-of-interest.slice.js";

const loadAll = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto[]>,
	PointsOfInterestSearchQuery,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (query, { extra }) => {
	const { pointOfInterestApi } = extra;

	return await pointOfInterestApi.getAll(query);
});

export { loadAll };
