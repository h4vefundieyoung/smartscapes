import { createAsyncThunk } from "@reduxjs/toolkit";

import { type APIResponse, type AsyncThunkConfig } from "~/libs/types/types.js";

import { type PointsOfInterestResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./points-of-interest.slice.js";

const getById = createAsyncThunk<
	APIResponse<PointsOfInterestResponseDto>,
	number,
	AsyncThunkConfig
>(`${sliceName}/find-by-id`, async (id, { extra }) => {
	const { pointsOfInterestApi } = extra;

	return await pointsOfInterestApi.getById(id);
});

export { getById };
