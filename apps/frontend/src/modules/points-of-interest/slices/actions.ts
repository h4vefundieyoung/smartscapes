import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type PointsOfInterestRequestDto,
	type PointsOfInterestResponseDto,
} from "~/modules/points-of-interest/points-of-interest.js";

import { name as sliceName } from "./points-of-interest.slice.js";

const create = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto>,
	PointsOfInterestRequestDto,
	AsyncThunkConfig
>(`${sliceName}/create`, async (payload, { extra }) => {
	const { pointOfInterestApi } = extra;

	const pointOfInterest = await pointOfInterestApi.create(payload);

	return pointOfInterest;
});

export { create };
