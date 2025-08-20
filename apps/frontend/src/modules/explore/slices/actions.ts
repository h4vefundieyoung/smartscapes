import { createAsyncThunk } from "@reduxjs/toolkit";

import { type Location } from "~/libs/types/types.js";

import { routesApi } from "../../routes/routes.js";
import { type RouteGetByIdResponseDto } from "../libs/types/types.js";
import { name as sliceName } from "./explore.slice.js";

const getRoutes = createAsyncThunk<
	RouteGetByIdResponseDto[],
	Location,
	{ rejectValue: string }
>(
	`${sliceName}/get-routes`,
	async ({ latitude, longitude }, { rejectWithValue }) => {
		try {
			const response = await routesApi.getAll({ latitude, longitude });

			return response.data;
		} catch {
			return rejectWithValue("Failed to fetch routes.");
		}
	},
);

export { getRoutes };
