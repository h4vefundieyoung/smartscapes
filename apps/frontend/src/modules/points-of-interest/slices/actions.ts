import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";
import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/points-of-interest.js";

import { name as sliceName } from "./points-of-interest-details.slice.js";

const loadById = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/load-by-id`, (id, { extra }) => {
	const { pointsOfInterestApi } = extra;

	return pointsOfInterestApi.getById(id);
});

export { loadById };
