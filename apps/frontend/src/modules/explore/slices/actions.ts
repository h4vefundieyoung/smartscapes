import { createAsyncThunk } from "@reduxjs/toolkit";

import { type Location } from "~/libs/types/types.js";

import { routeApi } from "../../routes/routes.js";
import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./explore.slice.js";

const getRoutes = createAsyncThunk<
	RouteGetByIdResponseDto[],
	Location | undefined,
	{ rejectValue: string }
>(`${sliceName}/get-routes`, async (location, { rejectWithValue }) => {
	try {
		const response = await routeApi.getAll(location);

		return response.data;
	} catch {
		return rejectWithValue("Failed to fetch routes.");
	}
});

export { getRoutes };
