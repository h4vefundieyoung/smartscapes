import { createAsyncThunk } from "@reduxjs/toolkit";

import { type RootState } from "~/libs/types/types.js";

import { routeApi } from "../../routes/routes.js";
import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./explore.slice.js";

const getRoutes = createAsyncThunk<
	RouteGetByIdResponseDto[],
	undefined,
	{ rejectValue: string; state: RootState }
>(`${sliceName}/get-routes`, async (_, { getState, rejectWithValue }) => {
	const { location } = getState().location;

	if (!location) {
		return rejectWithValue("Location is not available.");
	}

	try {
		const response = await routeApi.getAll({
			latitude: location.latitude,
			longitude: location.longitude,
		});

		return response.data;
	} catch {
		return rejectWithValue("Failed to fetch routes.");
	}
});

export { getRoutes };
